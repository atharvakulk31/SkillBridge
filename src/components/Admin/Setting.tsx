import React from 'react';
import { Settings, User, Lock, Bell, Mail, Database, Shield } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up">
      <div className="flex items-center mb-8">
        <Settings className="h-6 w-6 text-indigo-600 mr-2" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Account Settings Card */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-indigo-500 mr-3" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-700">Account Settings</h2>
          </div>
          <p className="text-gray-600 mb-4">Manage your profile information and login details</p>
          <button 
            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            aria-label="Configure account settings"
          >
            Configure
          </button>
        </section>

        {/* Security Settings Card */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <Lock className="h-5 w-5 text-indigo-500 mr-3" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-700">Security</h2>
          </div>
          <p className="text-gray-600 mb-4">Change password, enable 2FA, and manage sessions</p>
          <button 
            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            aria-label="Manage security settings"
          >
            Secure Account
          </button>
        </section>

        {/* Notifications Card */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-indigo-500 mr-3" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
          </div>
          <p className="text-gray-600 mb-4">Configure email and in-app notifications</p>
          <button 
            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            aria-label="Manage notification settings"
          >
            Manage Alerts
          </button>
        </section>

        {/* Email Settings Card */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 text-indigo-500 mr-3" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-700">Email Configuration</h2>
          </div>
          <p className="text-gray-600 mb-4">Set up email templates and SMTP settings</p>
          <button 
            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            aria-label="Configure email settings"
          >
            Configure Email
          </button>
        </section>

        {/* Database Backup Card */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <Database className="h-5 w-5 text-indigo-500 mr-3" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-700">Database</h2>
          </div>
          <p className="text-gray-600 mb-4">Backup and restore your application data</p>
          <button 
            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            aria-label="Manage database settings"
          >
            Manage Database
          </button>
        </section>

        {/* Privacy Settings Card */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-indigo-500 mr-3" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-700">Privacy</h2>
          </div>
          <p className="text-gray-600 mb-4">Configure GDPR and data privacy settings</p>
          <button 
            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            aria-label="Manage privacy settings"
          >
            Privacy Center
          </button>
        </section>
      </div>

      {/* System Settings Section */}
      <section className="mt-10 bg-gray-50 p-6 rounded-xl border border-gray-200" aria-labelledby="system-settings-heading">
        <h2 id="system-settings-heading" className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Settings className="h-5 w-5 text-indigo-500 mr-2" aria-hidden="true" />
          System Settings
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="maintenance-mode" className="font-medium text-gray-700">Maintenance Mode</label>
              <p id="maintenance-mode-desc" className="text-sm text-gray-500">Temporarily disable access to the platform</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                id="maintenance-mode"
                aria-describedby="maintenance-mode-desc"
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="auto-updates" className="font-medium text-gray-700">Auto Updates</label>
              <p id="auto-updates-desc" className="text-sm text-gray-500">Automatically install system updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                id="auto-updates"
                aria-describedby="auto-updates-desc"
                defaultChecked 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="error-reporting" className="font-medium text-gray-700">Error Reporting</label>
              <p id="error-reporting-desc" className="text-sm text-gray-500">Send error reports to help improve the system</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                id="error-reporting"
                aria-describedby="error-reporting-desc"
                defaultChecked 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            aria-label="Save system settings"
          >
            Save System Settings
          </button>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;