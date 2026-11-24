"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { User, Mail, Phone, MapPin, Globe, Code2, Save, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function StudentSettingsPage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || "Alex Chen");
  const [bio, setBio] = useState(user?.bio || "");
  const [phone, setPhone] = useState(user?.phone || "+1 (555) 234-5678");
  const [location, setLocation] = useState(user?.location || "Chicago, IL");
  const [githubUrl, setGithubUrl] = useState(user?.github_url || "https://github.com/alexchen-dev");
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedin_url || "https://linkedin.com/in/alexchen-sre");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in duration-300 pb-20">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F3FF]">
          Account & Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          Manage your personal details, verified links, and notification preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 bg-[#151520] border-[#232336] shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-[#F5F3FF] border-b border-[#232336] pb-3">
            Public Candidate Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[#E4E1EC] block mb-1">
                Full Name
              </label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#E4E1EC] block mb-1">
                Email Address
              </label>
              <Input
                disabled
                value={user?.email || "alex.chen@unlocked.edu"}
                className="opacity-70 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#E4E1EC] block mb-1">
              Professional Bio
            </label>
            <Textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[#E4E1EC] block mb-1">
                Phone Number
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#E4E1EC] block mb-1">
                Location
              </label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-medium text-[#E4E1EC] block mb-1">
                GitHub Profile URL
              </label>
              <Input
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#E4E1EC] block mb-1">
                LinkedIn Profile URL
              </label>
              <Input
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#232336]">
            <Button type="submit" variant="gradient" size="sm" className="gap-2 text-xs">
              <Save className="w-3.5 h-3.5" />
              {isSaved ? "Changes Saved!" : "Save Profile Settings"}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
