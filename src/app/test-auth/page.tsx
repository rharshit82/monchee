"use client";

import { useUser, useAuth } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

export default function TestAuthPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Authentication Test
          </CardTitle>
          <CardDescription>
            Test page to verify Clerk authentication is working
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSignedIn ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">✅ Signed In</h3>
                <p className="text-sm text-green-800">
                  Welcome, {user?.firstName || user?.username || 'User'}!
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm"><strong>User ID:</strong> {user?.id}</p>
                <p className="text-sm"><strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress}</p>
                <p className="text-sm"><strong>Username:</strong> {user?.username || 'Not set'}</p>
              </div>
              
              <Button onClick={() => signOut()} className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Not Signed In</h3>
                <p className="text-sm text-yellow-800">
                  You need to sign in to access this page.
                </p>
              </div>
              
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <a href="/sign-in">Sign In</a>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <a href="/sign-up">Sign Up</a>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
