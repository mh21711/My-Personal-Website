'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLocale } from "@/app/context"
import { cn } from '@/lib/utils';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  image: string;
  createdAt?: string | Date;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { isRTL } = useLocale();

  // Internal translation object
  const t = isRTL ? {
    title: "لوحة التحكم",
    totalUsers: "إجمالي المستخدمين",
    thProfile: "الملف الشخصي",
    thName: "الاسم",
    thEmail: "البريد الإلكتروني",
    thRole: "الصلاحية",
    loading: "جاري التحميل...",
    noUsers: "لم يتم العثور على مستخدمين",
    createBlog: "إنشاء مقال جديد",
    createdAt: "تاريخ الإنشاء",
  } : {
    title: "Dashboard",
    totalUsers: "Total Users",
    thProfile: "Profile",
    thName: "Name",
    thEmail: "Email",
    thRole: "Role",
    loading: "Loading...",
    noUsers: "No users found",
    createBlog: "Create New Blog Post",
    createdAt: "Created At",
  };

  // Fetch users
  useEffect(() => {
    if (session?.user?.role === 'admin') {
      const fetchUsers = async () => {
        try {
          const response = await fetch('/api/users');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          setUsers(Array.isArray(data) ? data : data.users || []);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load users');
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [session?.user?.role]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center">{t.loading}</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="mb-8 flex items-center gap-4 rounded-lg bg-card border border-border p-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">{t.totalUsers}</p>
              <p className="text-3xl font-bold text-foreground">{users.length}</p>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header */}
              <thead>
                <tr className={cn("bg-muted border-b border-border",
                  isRTL ? "text-right" : "text-left"
                )}>
                  <th className="px-6 py-4 text-sm font-semibold text-foreground">
                    {t.thProfile}
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-foreground">
                    {t.thName}
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-foreground">
                    {t.thEmail}
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-foreground">
                    {t.createdAt}
                  </th>
                  <th className="px-6 py-4 font-semibold text-foreground">
                    {t.thRole}
                  </th>
                </tr>
              </thead>
              {/* Body */}
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      {t.loading}
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-destructive">
                      {error}
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      {t.noUsers}
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"

                    >
                      {/* Profile Image */}
                      <td className="px-6 py-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden border border-border bg-muted text-sm font-semibold text-slate-700">
                          {user.image ? (
                            <Image
                              src={user.image}
                              alt={user.name}
                              width={32}
                              height={32}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span>{user.name?.charAt(0) || 'U'}</span>
                          )}
                        </div>
                      </td>
                      {/* Name */}
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {user.name}
                      </td>
                      {/* Email */}
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {user.email}
                      </td>
                      {/* Email */}
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      {/* Role Badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Blog Button */}
        <div className="mt-8 flex justify-center">
          <Link href="/dashboard/create-blog">
            <Button size="lg">
              <Plus className="h-5 w-5 mr-2" />
              {t.createBlog}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
