module cinevault::allowlist_policy {
    // Remove explicit aliases for items provided by default
    use sui::object;
    use sui::tx_context;
    // Keep using specific items when not importing the full module
    use sui::transfer;
    use sui::event;
    use std::vector;
    use std::string::String;

    /// Custom error codes for better error handling
    const ENotOwner: u64 = 1;
    const EAddressAlreadyExists: u64 = 2;
    const EAddressNotFound: u64 = 6;
    const ENoAccess: u64 = 4;

    /// Events for tracking important actions
    public struct AddressAdded has copy, drop { addr: address }
    public struct AddressRemoved has copy, drop { addr: address }

    /// The Allowlist struct holds the owner and a list of allowed addresses.
    public struct Allowlist has key, store {
        id: object::UID,
        name: String,
        owner: address,
        allowed: vector<address>,
    }

    /// Creating allowlist - returns the Allowlist object
    public fun create_allowlist(name: String, ctx: &mut tx_context::TxContext): Allowlist {
        let sender = tx_context::sender(ctx);
        Allowlist {
            id: object::new(ctx),
            name,
            owner: sender,
            allowed: vector::empty<address>(),
        }
    }

    /// Entry function to create and transfer an allowlist to the sender
    public entry fun create_allowlist_entry(name: String, ctx: &mut tx_context::TxContext) {
        let allowlist = create_allowlist(name, ctx);
        transfer::transfer(allowlist, tx_context::sender(ctx));
    }

    /// Adds an address to the allowlist. Only the owner can perform this action.
    public entry fun add_address(allowlist: &mut Allowlist, addr: address, ctx: &tx_context::TxContext) {
        let sender = tx_context::sender(ctx);
        assert!(sender == allowlist.owner, ENotOwner);
        assert!(!vector::contains(&allowlist.allowed, &addr), EAddressAlreadyExists);
        vector::push_back(&mut allowlist.allowed, addr);
        event::emit(AddressAdded { addr });
    }

    /// Removes an address from the allowlist. Only the owner can perform this action.
    public entry fun remove_address(allowlist: &mut Allowlist, addr: address, ctx: &tx_context::TxContext) {
        let sender = tx_context::sender(ctx);
        assert!(sender == allowlist.owner, ENotOwner);
        let (found, index) = vector::index_of(&allowlist.allowed, &addr);
        assert!(found, EAddressNotFound);
        vector::remove(&mut allowlist.allowed, index);
        event::emit(AddressRemoved { addr });
    }

    /// Checks if an address is in the allowlist.
    public fun is_allowed(allowlist: &Allowlist, addr: address): bool {
        vector::contains(&allowlist.allowed, &addr)
    }

    /// Returns the owner of the allowlist
    public fun get_owner(allowlist: &Allowlist): address {
        allowlist.owner
    }

    /// Returns the number of addresses in the allowlist
    public fun size(allowlist: &Allowlist): u64 {
        vector::length(&allowlist.allowed)
    }

    /// Returns all allowed addresses
    public fun get_all_allowed(allowlist: &Allowlist): vector<address> {
        allowlist.allowed
    }

    /// Transfers ownership of the allowlist to a new owner
    public entry fun transfer_ownership(allowlist: &mut Allowlist, new_owner: address, ctx: &tx_context::TxContext) {
        let sender = tx_context::sender(ctx);
        assert!(sender == allowlist.owner, ENotOwner);
        allowlist.owner = new_owner;
    }

    /// Access control
    public fun namespace(allowlist: &Allowlist): vector<u8> {
        object::uid_to_bytes(&allowlist.id)
    }

    /// All allowlisted addresses can access all IDs with the prefix of the allowlist
    fun approve_internal(caller: address, _id: vector<u8>, allowlist: &Allowlist): bool {
        let _namespace = namespace(allowlist);
        // Implement prefix check logic here if needed
        vector::contains(&allowlist.allowed, &caller)
    }

    public entry fun seal_approve(id: vector<u8>, allowlist: &Allowlist, ctx: &tx_context::TxContext) {
        assert!(approve_internal(tx_context::sender(ctx), id, allowlist), ENoAccess);
    }
}