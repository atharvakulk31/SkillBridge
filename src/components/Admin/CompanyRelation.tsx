import React, { useState } from 'react';
import { Building, Mail, Phone, Calendar, Plus, Search, Filter, Download, Edit2, Trash2, ChevronDown, Check, X } from 'lucide-react';

interface Company {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  lastContact: string;
  status: 'Active' | 'Draft' | 'Inactive';
  partnershipSince: string;
}

interface CompanyRelationsProps {
  companies: Company[];
}

const CompanyRelations: React.FC<CompanyRelationsProps> = ({ companies: initialCompanies }) => {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const filteredCompanies = companies
    .filter(company => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(company => 
      filterStatus === 'All' || company.status === filterStatus
    );

  const openCompanyModal = (company: Company | null = null) => {
    setCurrentCompany(company || {
      id: 0,
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      lastContact: new Date().toISOString().split('T')[0],
      status: 'Draft',
      partnershipSince: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentCompany(prev => ({
      ...(prev as Company),
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCompany) return;

    if (currentCompany.id) {
      // Update existing company
      setCompanies(companies.map(c => c.id === currentCompany.id ? currentCompany : c));
      setSuccessMessage('Company updated successfully!');
    } else {
      // Add new company
      const newId = companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1;
      setCompanies([{ ...currentCompany, id: newId }, ...companies]);
      setSuccessMessage('Company added successfully!');
    }

    setIsModalOpen(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteCompany = (id: number) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter(company => company.id !== id));
      setSuccessMessage('Company deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header and Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Building className="mr-2" /> Company Relations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="text-3xl font-bold text-indigo-700">{companies.length}</div>
            <div className="text-gray-600">Total Companies</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-3xl font-bold text-green-700">
              {companies.filter(c => c.status === 'Active').length}
            </div>
            <div className="text-gray-600">Active Partners</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-700">
              {new Date().getFullYear() - Math.min(...companies.map(c => new Date(c.partnershipSince).getFullYear()))}+
            </div>
            <div className="text-gray-600">Years Partnering</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => openCompanyModal(null)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="mr-2" /> Add Company
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Companies Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="pb-3">Company</th>
              <th className="pb-3">Contact</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Phone</th>
              <th className="pb-3">Last Contact</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map(company => (
              <tr key={company.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 font-medium">{company.name}</td>
                <td className="py-4">{company.contactPerson}</td>
                <td className="py-4 text-blue-600 hover:underline">
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </td>
                <td className="py-4">{company.phone}</td>
                <td className="py-4">{company.lastContact}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    company.status === 'Active' ? 'bg-green-100 text-green-800' :
                    company.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {company.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => openCompanyModal(company)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteCompany(company.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Company Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  {currentCompany?.id ? 'Edit Company' : 'Add New Company'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={currentCompany?.name || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={currentCompany?.contactPerson || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={currentCompany?.email || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={currentCompany?.phone || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Contact *</label>
                    <input
                      type="date"
                      name="lastContact"
                      value={currentCompany?.lastContact || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Partnership Since *</label>
                    <input
                      type="date"
                      name="partnershipSince"
                      value={currentCompany?.partnershipSince || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    name="status"
                    value={currentCompany?.status || 'Draft'}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                  >
                    <Check className="mr-2" /> {currentCompany?.id ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default CompanyRelations;