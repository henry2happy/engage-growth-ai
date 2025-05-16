
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully",
      });
    }, 1000);
  };
  
  return (
    <DashboardLayout 
      title="Settings" 
      subtitle="Manage your account preferences"
    >
      <div className="space-y-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-4 sm:w-[400px]">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-xl font-semibold">
                      JD
                    </div>
                    <Button variant="secondary" size="sm">Change Photo</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input id="jobTitle" defaultValue="Marketing Manager" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" className="min-h-32" defaultValue="Marketing professional with 5+ years of experience in social media management and content strategy." />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Account Settings */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notifications</h3>
                  <Separator />
                  <div className="space-y-3">
                    {[
                      { id: "email-notifs", label: "Email Notifications", desc: "Receive email alerts for important updates" },
                      { id: "post-notifs", label: "Post Performance", desc: "Get notified when posts exceed engagement thresholds" },
                      { id: "schedule-notifs", label: "Scheduled Posts", desc: "Get reminders before scheduled posts go live" },
                      { id: "mention-notifs", label: "Mentions & Comments", desc: "Receive alerts when your brand is mentioned" }
                    ].map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div>
                          <Label htmlFor={item.id} className="font-medium">{item.label}</Label>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch id={item.id} defaultChecked={item.id !== "mention-notifs"} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Security</h3>
                  <Separator />
                  <Button variant="outline">Change Password</Button>
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="2fa" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect your social platforms and other services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    { name: "Instagram", connected: true, icon: "instagram-icon" },
                    { name: "Twitter", connected: true, icon: "twitter-icon" },
                    { name: "LinkedIn", connected: false, icon: "linkedin-icon" },
                    { name: "Facebook", connected: true, icon: "facebook-icon" },
                    { name: "TikTok", connected: false, icon: "tiktok-icon" }
                  ].map((platform) => (
                    <div key={platform.name} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                          <span className="text-sm font-medium">{platform.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{platform.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {platform.connected ? "Connected" : "Not connected"}
                          </p>
                        </div>
                      </div>
                      <Button variant={platform.connected ? "outline" : "default"} size="sm">
                        {platform.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-medium">API Access</h3>
                  <Separator />
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">API Key</h4>
                        <p className="text-sm text-muted-foreground mb-2">Use this key to access our API endpoints</p>
                        <Input value="••••••••••••••••••••••••••••" readOnly className="font-mono bg-muted" />
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Billing Tab */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>Manage your billing information and subscription details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Pro Plan</h3>
                        <p className="text-sm text-muted-foreground">$49/month • Renews on May 22, 2025</p>
                      </div>
                      {/* Fixed here: Added className="" to resolve the TypeScript error */}
                      <Badge className="">Current Plan</Badge>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Unlimited posts across 5 social platforms</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Advanced analytics and reporting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>AI content generation (500 prompts/month)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Priority customer support</span>
                      </li>
                    </ul>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">Change Plan</Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:border-red-300 hover:bg-red-50">Cancel Subscription</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Payment Method</h3>
                    <Separator />
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-muted rounded flex items-center justify-center">
                          <span className="text-xs font-medium">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 04/25</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <Button variant="outline" size="sm">Add Payment Method</Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Billing History</h3>
                    <Separator />
                    <div className="space-y-2">
                      {[
                        { date: "Apr 22, 2025", amount: "$49.00", status: "Upcoming" },
                        { date: "Mar 22, 2025", amount: "$49.00", status: "Paid" },
                        { date: "Feb 22, 2025", amount: "$49.00", status: "Paid" },
                      ].map((invoice, i) => (
                        <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{invoice.date}</p>
                            <p className="text-sm text-muted-foreground">{invoice.status}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span>{invoice.amount}</span>
                            {invoice.status === "Paid" && (
                              <Button variant="ghost" size="sm">Download</Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Helper components
const Textarea = ({ className, ...props }) => (
  <textarea 
    className={`flex min-h-80 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 ${className}`}>
    {children}
  </span>
);

const CheckIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default Settings;
