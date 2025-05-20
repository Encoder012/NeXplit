module 0x0::subscription {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::coin::{Self, Coin};
    use sui::clock::{Self, Clock};
    use sui::balance::{Self, Balance};
    use std::string::{Self, String};
    use std::vector;

    /// Error codes
    const E_TOO_MANY_USERS: u64 = 0;
    const E_INVALID_MONTHS: u64 = 1;
    const E_PRICE_MISMATCH: u64 = 2;
    const E_NOT_BUYER: u64 = 3;
    const E_NOT_SELLER: u64 = 4;
    const E_ALREADY_JOINED: u64 = 6;
    
    // Constants
    const MAX_U64: u64 = 18446744073709551615;
    
    /// Each buyer's usage and contribution
    public struct BuyerInfo has store {
        buyer: address,
        months: u64,
        start_time: u64,
        paid: u64,
        claimed_months: u64,
    }

    /// NFT representing the seller's OTT platform
    public struct PlatformNFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: String,
        price_per_month: u64,
        total_duration: u64,
        max_users: u64,
        seller: address,
    }

    /// Subscription NFT representing buyer's 1:1 subscription instance
    public struct SubscriptionNFT<phantom T> has key, store {
        id: UID,
        platform_id: address,
        buyers: vector<BuyerInfo>,
        escrow: Balance<T>,
    }

    /// Create a new OTT platform NFT and transfer to sender
    public entry fun create_platform(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        price_per_month: u64,
        total_duration: u64,
        max_users: u64,
        ctx: &mut TxContext
    ) {
        let platform = PlatformNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: string::utf8(url),
            price_per_month,
            total_duration,
            max_users,
            seller: tx_context::sender(ctx),
        };
        transfer::transfer(platform, tx_context::sender(ctx));
    }

    /// Create a new subscription linked to a platform
    public entry fun create_subscription<T>(
        platform: &PlatformNFT,
        ctx: &mut TxContext
    ) {
        let platform_id = object::id_address(platform);
        let subscription = SubscriptionNFT<T> {
            id: object::new(ctx),
            platform_id,
            buyers: vector::empty(),
            escrow: balance::zero<T>(),
        };
        transfer::transfer(subscription, tx_context::sender(ctx));
    }

    /// Buyer joins a subscription, possibly delayed start
    public entry fun join_subscription<T>(
        subscription: &mut SubscriptionNFT<T>,
        platform: &PlatformNFT,
        months: u64,
        payment: Coin<T>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let buyer = tx_context::sender(ctx);
        assert!(months >= 1, E_INVALID_MONTHS);
        assert!(months <= platform.total_duration, E_INVALID_MONTHS);

        // Check if buyer already joined
        let buyers = &subscription.buyers;
        let mut i = 0;
        while (i < vector::length(buyers)) {
            let b = vector::borrow(buyers, i);
            assert!(b.buyer != buyer, E_ALREADY_JOINED);
            i = i + 1;
        };

        let now = clock::timestamp_ms(clock);
        let month_ms = 30 * 24 * 60 * 60 * 1000;
        let duration = months * month_ms;

        let mut start_times = vector::empty<u64>();
        let mut end_times = vector::empty<u64>();
        i = 0;
        while (i < vector::length(buyers)) {
            let b = vector::borrow(buyers, i);
            vector::push_back(&mut start_times, b.start_time);
            vector::push_back(&mut end_times, b.start_time + b.months * month_ms);
            i = i + 1;
        };

        let mut candidate_start = now;
        let should_continue = true;
        
        while (should_continue) {
            let mut overlapping = 0;
            let mut j = 0;
            while (j < vector::length(&start_times)) {
                let s = *vector::borrow(&start_times, j);
                let e = *vector::borrow(&end_times, j);
                if (!(candidate_start + duration <= s || candidate_start >= e)) {
                    overlapping = overlapping + 1;
                };
                j = j + 1;
            };
            
            if (overlapping < platform.max_users) {
                break
            };
            
            let mut min_future_end = MAX_U64;
            j = 0;
            while (j < vector::length(&end_times)) {
                let e = *vector::borrow(&end_times, j);
                if (e > candidate_start && e < min_future_end) {
                    min_future_end = e;
                };
                j = j + 1;
            };
            candidate_start = min_future_end;
        };

        let required = platform.price_per_month * months;
        let paid = coin::value(&payment);
        assert!(paid == required, E_PRICE_MISMATCH);

        balance::join(&mut subscription.escrow, coin::into_balance(payment));
        let info = BuyerInfo {
            buyer,
            months,
            start_time: candidate_start,
            paid,
            claimed_months: 0,
        };
        vector::push_back(&mut subscription.buyers, info);
    }

    /// Seller claims payment based on elapsed time
    public entry fun claim_payment<T>(
        subscription: &mut SubscriptionNFT<T>,
        platform: &PlatformNFT,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let seller = tx_context::sender(ctx);
        assert!(seller == platform.seller, E_NOT_SELLER);

        let now = clock::timestamp_ms(clock);
        let month_ms = 30 * 24 * 60 * 60 * 1000;
        let mut total_claim = 0;

        let buyers = &mut subscription.buyers;
        let mut i = 0;
        while (i < vector::length(buyers)) {
            let b = vector::borrow_mut(buyers, i);
            let elapsed = (now - b.start_time) / month_ms;
            if (elapsed > b.claimed_months) {
                let claimable = elapsed - b.claimed_months;
                let amount = claimable * platform.price_per_month;
                total_claim = total_claim + amount;
                b.claimed_months = b.claimed_months + claimable;
            };
            i = i + 1;
        };

        if (total_claim > 0) {
            let claim_balance = balance::split(&mut subscription.escrow, total_claim);
            let claim_coin = coin::from_balance(claim_balance, ctx);
            transfer::public_transfer(claim_coin, seller);
        };
        
    }

}