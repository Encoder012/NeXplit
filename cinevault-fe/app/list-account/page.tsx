// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { ArrowLeft, Check, Info, Lock, Package, Shield } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Separator } from "@/components/ui/separator"
// import { Slider } from "@/components/ui/slider"
// import { Switch } from "@/components/ui/switch"
// import { Textarea } from "@/components/ui/textarea"
// import { useToast } from "@/components/ui/use-toast"
// import { useAuth } from "@/components/auth-provider"
// // import { useWallet } from "@/components/wallet-provider"
// import { BlockchainService } from "@/lib/blockchain-service"
// import {
//   useWallet
// } from "@suiet/wallet-kit";

// export default function ListAccountPage() {
//   const [step, setStep] = useState(1)
//   const [selectedService, setSelectedService] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const { user } = useAuth()
//   const wallet = useWallet()
//   const { toast } = useToast()
//   const router = useRouter()
//   const [blockchainService] = useState(() => new BlockchainService())

//   // Set wallet in blockchain service
//   useEffect(() => {
//     blockchainService.setWallet(wallet)
//   }, [wallet, blockchainService])

//   // Form state
//   const [formData, setFormData] = useState({
//     service: "",
//     customService: "",
//     plan: "",
//     monthlyCost: "",
//     maxDuration: [12],
//     features: "",
//     email: "",
//     password: "",
//     profilePin: "",
//     restrictProfiles: false,
//     preventDownloads: false,
//     preventChanges: true,
//     additionalInstructions: "",
//     pricingModel: "percentage",
//     price: "",
//     minDuration: [1],
//     publicListing: true,
//     featuredListing: false,
//   })

//   const updateFormData = (field: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleServiceChange = (value: string) => {
//     setSelectedService(value)
//     updateFormData("service", value)
//   }

//   const handleSubmit = async () => {
//     setIsSubmitting(true)

//     try {
//       // Validate wallet connection
//       if (!wallet?.connected) {
//         toast({
//           title: "Wallet not connected",
//           description: "Please connect your wallet to create a listing.",
//           variant: "destructive",
//         })
//         setIsSubmitting(false)
//         return
//       }

//       // Create the platform NFT and subscription on the blockchain
//       const result = await blockchainService.createListing(
//         formData.service === "other" ? formData.customService : formData.service,
//         formData.features,
//         getServiceUrl(formData.service),
//         Number.parseFloat(formData.price),
//         formData.maxDuration[0],
//         formData.service === "netflix" ? 4 : formData.service === "disney" ? 7 : 2, // Default max users based on service
//       )

//       // Store the listing data in your backend/database
//       // This would typically be an API call to your backend
//       await new Promise((resolve) => setTimeout(resolve, 1500))

//       toast({
//         title: "Listing created successfully",
//         description: "Your account has been listed on the marketplace with blockchain verification.",
//       })

//       // Navigate to the listing details page
//       router.push(`/my-listings/${result.platformId}`)
//     } catch (error) {
//       console.error("Error creating listing:", error)
//       toast({
//         title: "Error creating listing",
//         description: error.message || "There was a problem creating your listing. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   // Helper function to get service URL
//   const getServiceUrl = (service) => {
//     const services = {
//       netflix: "https://netflix.com",
//       disney: "https://disneyplus.com",
//       hbo: "https://hbomax.com",
//       spotify: "https://spotify.com",
//       amazon: "https://amazon.com/primevideo",
//       youtube: "https://youtube.com",
//       other: "https://example.com",
//     }
//     return services[service] || "https://example.com"
//   }

//   return (
//     <div className="container max-w-5xl py-8">
//       <div className="mb-8 flex items-center gap-4">
//         <Button variant="outline" size="icon" asChild>
//           <Link href="/dashboard">
//             <ArrowLeft className="h-4 w-4" />
//             <span className="sr-only">Back to dashboard</span>
//           </Link>
//         </Button>
//         <div>
//           <h1 className="text-2xl font-bold">List Your Streaming Account</h1>
//           <p className="text-muted-foreground">Share your account securely and earn money</p>
//         </div>
//       </div>

//       <div className="grid gap-8 lg:grid-cols-3">
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle>Account Details</CardTitle>
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <Shield className="h-4 w-4 text-primary" />
//                   Secure Form
//                 </div>
//               </div>
//               <CardDescription>Enter the details of the streaming account you want to share</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {step === 1 && (
//                 <div className="space-y-6">
//                   <div className="space-y-4">
//                     <Label htmlFor="service">Streaming Service</Label>
//                     <Select value={selectedService} onValueChange={handleServiceChange}>
//                       <SelectTrigger id="service">
//                         <SelectValue placeholder="Select a streaming service" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="netflix">Netflix</SelectItem>
//                         <SelectItem value="disney">Disney+</SelectItem>
//                         <SelectItem value="hbo">HBO Max</SelectItem>
//                         <SelectItem value="spotify">Spotify</SelectItem>
//                         <SelectItem value="amazon">Amazon Prime</SelectItem>
//                         <SelectItem value="youtube">YouTube Premium</SelectItem>
//                         <SelectItem value="other">Other</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {selectedService === "other" && (
//                     <div className="space-y-2">
//                       <Label htmlFor="custom-service">Service Name</Label>
//                       <Input
//                         id="custom-service"
//                         placeholder="Enter service name"
//                         value={formData.customService}
//                         onChange={(e) => updateFormData("customService", e.target.value)}
//                       />
//                     </div>
//                   )}

//                   <div className="space-y-2">
//                     <Label htmlFor="plan">Subscription Plan</Label>
//                     <Select value={formData.plan} onValueChange={(value) => updateFormData("plan", value)}>
//                       <SelectTrigger id="plan">
//                         <SelectValue placeholder="Select your subscription plan" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="basic">Basic</SelectItem>
//                         <SelectItem value="standard">Standard</SelectItem>
//                         <SelectItem value="premium">Premium</SelectItem>
//                         <SelectItem value="family">Family</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="monthly-cost">Monthly Subscription Cost ($)</Label>
//                     <Input
//                       id="monthly-cost"
//                       type="number"
//                       placeholder="0.00"
//                       value={formData.monthlyCost}
//                       onChange={(e) => updateFormData("monthlyCost", e.target.value)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <Label htmlFor="max-duration">Maximum Sharing Duration</Label>
//                       <span className="text-sm text-muted-foreground">{formData.maxDuration[0]} months</span>
//                     </div>
//                     <Slider
//                       defaultValue={[12]}
//                       max={24}
//                       step={1}
//                       value={formData.maxDuration}
//                       onValueChange={(value) => updateFormData("maxDuration", value)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Account Features</Label>
//                     <Textarea
//                       placeholder="List the key features of your subscription (e.g., 4K streaming, multiple profiles, etc.)"
//                       value={formData.features}
//                       onChange={(e) => updateFormData("features", e.target.value)}
//                     />
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <Switch id="terms" />
//                     <Label htmlFor="terms" className="text-sm">
//                       I confirm this is my personal account and I have the right to share it
//                     </Label>
//                   </div>
//                 </div>
//               )}

//               {step === 2 && (
//                 <div className="space-y-6">
//                   <div className="rounded-lg border bg-muted/50 p-4">
//                     <div className="flex items-center gap-2 text-sm">
//                       <Info className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-muted-foreground">
//                         Your credentials will be encrypted using Mysten Labs SEAL technology and stored securely. Only
//                         authorized buyers will be able to decrypt them.
//                       </span>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="email">Account Email</Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="your-email@example.com"
//                         value={formData.email}
//                         onChange={(e) => updateFormData("email", e.target.value)}
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="password">Account Password</Label>
//                       <Input
//                         id="password"
//                         type="password"
//                         value={formData.password}
//                         onChange={(e) => updateFormData("password", e.target.value)}
//                       />
//                     </div>

//                     {(selectedService === "netflix" || selectedService === "disney" || selectedService === "hbo") && (
//                       <div className="space-y-2">
//                         <Label htmlFor="profile-pin">Profile PIN (if applicable)</Label>
//                         <Input
//                           id="profile-pin"
//                           type="password"
//                           value={formData.profilePin}
//                           onChange={(e) => updateFormData("profilePin", e.target.value)}
//                         />
//                       </div>
//                     )}

//                     <div className="space-y-2">
//                       <Label>Access Restrictions</Label>
//                       <div className="grid gap-2">
//                         <div className="flex items-center space-x-2">
//                           <Switch
//                             id="restrict-profiles"
//                             checked={formData.restrictProfiles}
//                             onCheckedChange={(checked) => updateFormData("restrictProfiles", checked)}
//                           />
//                           <Label htmlFor="restrict-profiles" className="text-sm">
//                             Restrict access to specific profiles
//                           </Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Switch
//                             id="prevent-downloads"
//                             checked={formData.preventDownloads}
//                             onCheckedChange={(checked) => updateFormData("preventDownloads", checked)}
//                           />
//                           <Label htmlFor="prevent-downloads" className="text-sm">
//                             Prevent downloads
//                           </Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Switch
//                             id="prevent-changes"
//                             checked={formData.preventChanges}
//                             onCheckedChange={(checked) => updateFormData("preventChanges", checked)}
//                           />
//                           <Label htmlFor="prevent-changes" className="text-sm">
//                             Prevent account changes
//                           </Label>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label>Additional Instructions</Label>
//                       <Textarea
//                         placeholder="Provide any additional instructions for the buyer (e.g., which profile to use)"
//                         value={formData.additionalInstructions}
//                         onChange={(e) => updateFormData("additionalInstructions", e.target.value)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {step === 3 && (
//                 <div className="space-y-6">
//                   <div className="space-y-4">
//                     <Label>Pricing Model</Label>
//                     <RadioGroup
//                       defaultValue="percentage"
//                       value={formData.pricingModel}
//                       onValueChange={(value) => updateFormData("pricingModel", value)}
//                     >
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="percentage" id="percentage" />
//                         <Label htmlFor="percentage">Percentage of subscription cost</Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="fixed" id="fixed" />
//                         <Label htmlFor="fixed">Fixed price per month</Label>
//                       </div>
//                     </RadioGroup>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="price">Price per Month ($)</Label>
//                     <Input
//                       id="price"
//                       type="number"
//                       placeholder="0.00"
//                       value={formData.price}
//                       onChange={(e) => updateFormData("price", e.target.value)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <Label htmlFor="min-duration">Minimum Sharing Duration</Label>
//                       <span className="text-sm text-muted-foreground">{formData.minDuration[0]} month(s)</span>
//                     </div>
//                     <Slider
//                       defaultValue={[1]}
//                       max={12}
//                       step={1}
//                       value={formData.minDuration}
//                       onValueChange={(value) => updateFormData("minDuration", value)}
//                     />
//                   </div>

//                   <div className="rounded-lg border p-4">
//                     <div className="space-y-3">
//                       <div className="text-sm font-medium">Payment Schedule</div>
//                       <div className="flex items-center justify-between text-sm">
//                         <span>First 50% payment</span>
//                         <span>At midpoint of sharing period</span>
//                       </div>
//                       <div className="flex items-center justify-between text-sm">
//                         <span>Final 50% payment</span>
//                         <span>At end of sharing period</span>
//                       </div>
//                       <div className="text-xs text-muted-foreground">
//                         All payments are held in escrow and automatically released according to this schedule
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Listing Visibility</Label>
//                     <div className="grid gap-2">
//                       <div className="flex items-center space-x-2">
//                         <Switch
//                           id="public-listing"
//                           defaultChecked
//                           checked={formData.publicListing}
//                           onCheckedChange={(checked) => updateFormData("publicListing", checked)}
//                         />
//                         <Label htmlFor="public-listing" className="text-sm">
//                           Public listing (visible to all users)
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Switch
//                           id="featured-listing"
//                           checked={formData.featuredListing}
//                           onCheckedChange={(checked) => updateFormData("featuredListing", checked)}
//                         />
//                         <Label htmlFor="featured-listing" className="text-sm">
//                           Featured listing (additional fee applies)
//                         </Label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               {step > 1 ? (
//                 <Button variant="outline" onClick={() => setStep(step - 1)}>
//                   Back
//                 </Button>
//               ) : (
//                 <Button variant="outline" asChild>
//                   <Link href="/dashboard">Cancel</Link>
//                 </Button>
//               )}

//               {step < 3 ? (
//                 <Button onClick={() => setStep(step + 1)}>Continue</Button>
//               ) : (
//                 <Button onClick={handleSubmit} disabled={isSubmitting}>
//                   {isSubmitting ? "Creating..." : "Create Listing"}
//                 </Button>
//               )}
//             </CardFooter>
//           </Card>
//         </div>

//         <div>
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Listing Progress</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4">
//                     <div
//                       className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "border bg-muted"
//                         }`}
//                     >
//                       {step > 1 ? <Check className="h-4 w-4" /> : "1"}
//                     </div>
//                     <div className="flex-1">
//                       <div className="text-sm font-medium">Account Details</div>
//                       <div className="text-xs text-muted-foreground">Service and subscription info</div>
//                     </div>
//                   </div>
//                   <Separator />
//                   <div className="flex items-center gap-4">
//                     <div
//                       className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "border bg-muted"
//                         }`}
//                     >
//                       {step > 2 ? <Check className="h-4 w-4" /> : "2"}
//                     </div>
//                     <div className="flex-1">
//                       <div className="text-sm font-medium">Credentials & Access</div>
//                       <div className="text-xs text-muted-foreground">Secure account information</div>
//                     </div>
//                   </div>
//                   <Separator />
//                   <div className="flex items-center gap-4">
//                     <div
//                       className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "border bg-muted"
//                         }`}
//                     >
//                       {step > 3 ? <Check className="h-4 w-4" /> : "3"}
//                     </div>
//                     <div className="flex-1">
//                       <div className="text-sm font-medium">Pricing & Terms</div>
//                       <div className="text-xs text-muted-foreground">Set your sharing conditions</div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Security Features</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex items-start gap-3">
//                     <Lock className="mt-0.5 h-5 w-5 text-primary" />
//                     <div>
//                       <div className="text-sm font-medium">Encrypted Credentials</div>
//                       <div className="text-xs text-muted-foreground">
//                         Your account details are encrypted using Mysten Labs SEAL technology
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <Shield className="mt-0.5 h-5 w-5 text-primary" />
//                     <div>
//                       <div className="text-sm font-medium">Blockchain Verification</div>
//                       <div className="text-xs text-muted-foreground">
//                         All agreements are secured on the Sui blockchain with NFT contracts
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <Package className="mt-0.5 h-5 w-5 text-primary" />
//                     <div>
//                       <div className="text-sm font-medium">Escrow Payments</div>
//                       <div className="text-xs text-muted-foreground">
//                         Payments are held in escrow and released at predefined milestones
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Need Help?</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4 text-sm">
//                   <p>If you need assistance with listing your account, our support team is here to help.</p>
//                   <Button variant="outline" className="w-full">
//                     Contact Support
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Info, Lock, Package, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth-provider";
import { BlockchainService } from "@/lib/blockchain-service";
import { useWallet } from "@suiet/wallet-kit";

export default function ListAccountPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const wallet = useWallet();
  const { toast } = useToast();
  const router = useRouter();
  const [blockchainService] = useState(() => new BlockchainService());

  // Set wallet in blockchain service
  useEffect(() => {
    blockchainService.setWallet(wallet);
  }, [wallet, blockchainService]);

  // Form state - restructured according to requirements
  const [formData, setFormData] = useState({
    // Platform NFT data
    name: "", // platform name (from service or customService)
    plan: "",
    pricePerMonth: "",
    duration: [12], // max duration
    concurrentUsers: 4, // default

    // SEAL data
    email: "", // email/phone
    password: "",
    profilePin: "",

    // Other necessary data for DB
    service: "",
    customService: "",
    features: "",
    restrictProfiles: false,
    preventDownloads: false,
    preventChanges: true,
    additionalInstructions: "",
    publicListing: true,
    featuredListing: false,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    updateFormData("service", value);
    // Also update the name field based on service selection
    if (value !== "other") {
      updateFormData("name", value);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Validate wallet connection
      if (!wallet?.connected) {
        toast({
          title: "Wallet not connected",
          description: "Please connect your wallet to create a listing.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // // Prepare final platform name
      const platformName =
        formData.service === "other"
          ? formData.customService
          : formData.service;

      // // Create the platform NFT and subscription on the blockchain
      const result = await blockchainService.createListing(
        platformName,
        formData.features,
        getServiceUrl(formData.service),
        Number.parseFloat(formData.pricePerMonth),
        formData.duration[0],
        formData.concurrentUsers
      );

      // // Store the listing data in your backend/database
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ✅ Store data in backend
      const platformId = "1"
      const payload = {
        ...formData,
        name: platformName, // Replace name with resolved platform name
        service: formData.service, // Original service type
        customService: formData.customService,
        blockchainPlatformId: platformId || "1", // Optional: store platform ID from blockchain
      };

      const response = await fetch("http://localhost:8000/api/accounts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save listing to backend.");
      }

      toast({
        title: "Listing created successfully",
        description:
          "Your account has been listed on the marketplace with blockchain verification.",
      });

      // Navigate to the listing details page
      router.push(`/my-listings/${platformId}`);
    } catch (error) {
      console.error("Error creating listing:", error);
      toast({
        title: "Error creating listing",
        description:
          "There was a problem creating your listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to get service URL
  const getServiceUrl = (service: any) => {
    const services = {
      netflix: "https://netflix.com",
      disney: "https://disneyplus.com",
      hbo: "https://hbomax.com",
      spotify: "https://spotify.com",
      amazon: "https://amazon.com/primevideo",
      youtube: "https://youtube.com",
      other: "https://example.com",
    };
    return "https://example.com";
  };

  // Update concurrent users based on service
  useEffect(() => {
    if (selectedService === "netflix") {
      updateFormData("concurrentUsers", 4);
    } else if (selectedService === "disney") {
      updateFormData("concurrentUsers", 7);
    } else {
      updateFormData("concurrentUsers", 2);
    }
  }, [selectedService]);

  return (
    <div className="container max-w-5xl py-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">List Your Streaming Account</h1>
          <p className="text-muted-foreground">
            Share your account securely and earn money
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Account Details</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  Secure Form
                </div>
              </div>
              <CardDescription>
                Enter the details of the streaming account you want to share
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="service">Streaming Service</Label>
                    <Select
                      value={selectedService}
                      onValueChange={handleServiceChange}
                    >
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Select a streaming service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="netflix">Netflix</SelectItem>
                        <SelectItem value="disney">Disney+</SelectItem>
                        <SelectItem value="hbo">HBO Max</SelectItem>
                        <SelectItem value="spotify">Spotify</SelectItem>
                        <SelectItem value="amazon">Amazon Prime</SelectItem>
                        <SelectItem value="youtube">YouTube Premium</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedService === "other" && (
                    <div className="space-y-2">
                      <Label htmlFor="custom-service">Service Name</Label>
                      <Input
                        id="custom-service"
                        placeholder="Enter service name"
                        value={formData.customService}
                        onChange={(e) => {
                          updateFormData("customService", e.target.value);
                          updateFormData("name", e.target.value);
                        }}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="plan">Subscription Plan</Label>
                    <Select
                      value={formData.plan}
                      onValueChange={(value) => updateFormData("plan", value)}
                    >
                      <SelectTrigger id="plan">
                        <SelectValue placeholder="Select your subscription plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthly-cost">
                      Monthly Subscription Cost ($)
                    </Label>
                    <Input
                      id="monthly-cost"
                      type="number"
                      placeholder="0.00"
                      value={formData.pricePerMonth}
                      onChange={(e) =>
                        updateFormData("pricePerMonth", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="duration">Sharing Duration</Label>
                      <span className="text-sm text-muted-foreground">
                        {formData.duration[0]} months
                      </span>
                    </div>
                    <Slider
                      defaultValue={[12]}
                      max={24}
                      step={1}
                      value={formData.duration}
                      onValueChange={(value) =>
                        updateFormData("duration", value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Account Features</Label>
                    <Textarea
                      placeholder="List the key features of your subscription (e.g., 4K streaming, multiple profiles, etc.)"
                      value={formData.features}
                      onChange={(e) =>
                        updateFormData("features", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I confirm this is my personal account and I have the right
                      to share it
                    </Label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Your credentials will be encrypted using Mysten Labs
                        SEAL technology and stored securely. Only authorized
                        buyers will be able to decrypt them.
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Account Email/Phone</Label>
                      <Input
                        id="email"
                        placeholder="your-email@example.com or phone number"
                        value={formData.email}
                        onChange={(e) =>
                          updateFormData("email", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Account Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          updateFormData("password", e.target.value)
                        }
                      />
                    </div>

                    {(selectedService === "netflix" ||
                      selectedService === "disney" ||
                      selectedService === "hbo") && (
                      <div className="space-y-2">
                        <Label htmlFor="profile-pin">
                          Profile PIN (if applicable)
                        </Label>
                        <Input
                          id="profile-pin"
                          type="password"
                          value={formData.profilePin}
                          onChange={(e) =>
                            updateFormData("profilePin", e.target.value)
                          }
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Access Restrictions</Label>
                      <div className="grid gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="restrict-profiles"
                            checked={formData.restrictProfiles}
                            onCheckedChange={(checked) =>
                              updateFormData("restrictProfiles", checked)
                            }
                          />
                          <Label
                            htmlFor="restrict-profiles"
                            className="text-sm"
                          >
                            Restrict access to specific profiles
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="prevent-downloads"
                            checked={formData.preventDownloads}
                            onCheckedChange={(checked) =>
                              updateFormData("preventDownloads", checked)
                            }
                          />
                          <Label
                            htmlFor="prevent-downloads"
                            className="text-sm"
                          >
                            Prevent downloads
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="prevent-changes"
                            checked={formData.preventChanges}
                            onCheckedChange={(checked) =>
                              updateFormData("preventChanges", checked)
                            }
                          />
                          <Label htmlFor="prevent-changes" className="text-sm">
                            Prevent account changes
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Additional Instructions</Label>
                      <Textarea
                        placeholder="Provide any additional instructions for the buyer (e.g., which profile to use)"
                        value={formData.additionalInstructions}
                        onChange={(e) =>
                          updateFormData(
                            "additionalInstructions",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Listing Visibility</Label>
                      <div className="grid gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="public-listing"
                            defaultChecked
                            checked={formData.publicListing}
                            onCheckedChange={(checked) =>
                              updateFormData("publicListing", checked)
                            }
                          />
                          <Label htmlFor="public-listing" className="text-sm">
                            Public listing (visible to all users)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="featured-listing"
                            checked={formData.featuredListing}
                            onCheckedChange={(checked) =>
                              updateFormData("featuredListing", checked)
                            }
                          />
                          <Label htmlFor="featured-listing" className="text-sm">
                            Featured listing (additional fee applies)
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
              )}

              {step < 2 ? (
                <Button onClick={() => setStep(step + 1)}>Continue</Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Listing"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Listing Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step >= 1
                          ? "bg-primary text-primary-foreground"
                          : "border bg-muted"
                      }`}
                    >
                      {step > 1 ? <Check className="h-4 w-4" /> : "1"}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Account Details</div>
                      <div className="text-xs text-muted-foreground">
                        Service and subscription info
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step >= 2
                          ? "bg-primary text-primary-foreground"
                          : "border bg-muted"
                      }`}
                    >
                      {step > 2 ? <Check className="h-4 w-4" /> : "2"}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        Credentials & Access
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Secure account information
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Lock className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">
                        Encrypted Credentials
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Your account details are encrypted using Mysten Labs
                        SEAL technology
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">
                        Blockchain Verification
                      </div>
                      <div className="text-xs text-muted-foreground">
                        All agreements are secured on the Sui blockchain with
                        NFT contracts
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Escrow Payments</div>
                      <div className="text-xs text-muted-foreground">
                        Payments are held in escrow and released at predefined
                        milestones
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <p>
                    If you need assistance with listing your account, our
                    support team is here to help.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
