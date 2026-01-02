'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useApp, Supplier } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { Building2, User, Mail, Phone, Globe, MapPin, CreditCard, Clock, DollarSign } from 'lucide-react';

interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  editSupplier?: Supplier | null;
}

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'CAD', label: 'CAD - Canadian Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
];

const PAYMENT_TERMS_OPTIONS = [
  { value: '', label: 'Select terms...' },
  { value: 'prepaid', label: 'Prepaid' },
  { value: 'cod', label: 'COD' },
  { value: 'net15', label: 'Net 15' },
  { value: 'net30', label: 'Net 30' },
  { value: 'net45', label: 'Net 45' },
  { value: 'net60', label: 'Net 60' },
];

const COUNTRY_OPTIONS = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'MX', label: 'Mexico' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'DE', label: 'Germany' },
  { value: 'CN', label: 'China' },
];

export function SupplierModal({ isOpen, onClose, editSupplier }: SupplierModalProps) {
  const { dispatch } = useApp();
  const { success, error } = useToast();

  // Basic info
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [currency, setCurrency] = useState<Supplier['currency']>('USD');

  // Contact info
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  // Address
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('US');

  // Terms
  const [paymentTerms, setPaymentTerms] = useState('');
  const [leadTimeDays, setLeadTimeDays] = useState<number | ''>('');
  const [minimumOrderValue, setMinimumOrderValue] = useState<number | ''>('');

  // Notes
  const [notes, setNotes] = useState('');
  const [isActive, setIsActive] = useState(true);

  const isEditing = !!editSupplier;

  // Reset form when modal opens/closes or editing supplier changes
  useEffect(() => {
    if (isOpen) {
      if (editSupplier) {
        setName(editSupplier.name);
        setCode(editSupplier.code);
        setCurrency(editSupplier.currency);
        setContactName(editSupplier.contactName || '');
        setEmail(editSupplier.email || '');
        setPhone(editSupplier.phone || '');
        setWebsite(editSupplier.website || '');
        setStreet(editSupplier.address?.street || '');
        setCity(editSupplier.address?.city || '');
        setState(editSupplier.address?.state || '');
        setZip(editSupplier.address?.zip || '');
        setCountry(editSupplier.address?.country || 'US');
        setPaymentTerms(editSupplier.paymentTerms || '');
        setLeadTimeDays(editSupplier.leadTimeDays || '');
        setMinimumOrderValue(editSupplier.minimumOrderValue || '');
        setNotes(editSupplier.notes || '');
        setIsActive(editSupplier.isActive);
      } else {
        setName('');
        setCode('');
        setCurrency('USD');
        setContactName('');
        setEmail('');
        setPhone('');
        setWebsite('');
        setStreet('');
        setCity('');
        setState('');
        setZip('');
        setCountry('US');
        setPaymentTerms('');
        setLeadTimeDays('');
        setMinimumOrderValue('');
        setNotes('');
        setIsActive(true);
      }
    }
  }, [isOpen, editSupplier]);

  const handleSubmit = () => {
    // Validation
    if (!name.trim()) {
      error('Supplier name is required');
      return;
    }
    if (!code.trim()) {
      error('Supplier code is required');
      return;
    }

    const supplierData: Supplier = {
      id: editSupplier?.id || crypto.randomUUID(),
      name: name.trim(),
      code: code.trim().toUpperCase(),
      currency,
      contactName: contactName.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      website: website.trim() || undefined,
      address: street.trim() ? {
        street: street.trim(),
        city: city.trim(),
        state: state.trim(),
        zip: zip.trim(),
        country,
      } : undefined,
      paymentTerms: paymentTerms || undefined,
      leadTimeDays: leadTimeDays ? Number(leadTimeDays) : undefined,
      minimumOrderValue: minimumOrderValue ? Number(minimumOrderValue) : undefined,
      notes: notes.trim() || undefined,
      isActive,
      createdAt: editSupplier?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (isEditing) {
      dispatch({ type: 'UPDATE_SUPPLIER', payload: supplierData });
      success('Supplier updated successfully!');
    } else {
      dispatch({ type: 'ADD_SUPPLIER', payload: supplierData });
      success('Supplier created successfully!');
    }

    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Supplier' : 'Add Supplier'}
      subtitle={isEditing ? `Editing ${editSupplier?.name}` : 'Create a new supplier'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isEditing ? 'Update Supplier' : 'Create Supplier'}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Basic Info */}
        <div>
          <h4 className="font-medium text-white mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            Basic Information
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-slate-400 mb-1.5">Supplier Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., HIGROCORP INC."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Supplier Code *</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g., HGC"
                maxLength={6}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 font-mono"
              />
              <p className="text-xs text-slate-500 mt-1">Short code for POs and references</p>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Currency *</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Supplier['currency'])}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              >
                {CURRENCY_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-medium text-white mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            Contact Information
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Contact Name</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Primary contact"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@company.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <h4 className="font-medium text-white mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-400" />
            Address
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-slate-400 mb-1.5">Street Address</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="123 Main Street"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">State/Province</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">ZIP/Postal Code</label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              >
                {COUNTRY_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div>
          <h4 className="font-medium text-white mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-400" />
            Terms & Defaults
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Payment Terms</label>
              <select
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              >
                {PAYMENT_TERMS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Lead Time (days)</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={leadTimeDays}
                  onChange={(e) => setLeadTimeDays(e.target.value ? parseInt(e.target.value) : '')}
                  placeholder="14"
                  min={0}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Minimum Order Value</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={minimumOrderValue}
                  onChange={(e) => setMinimumOrderValue(e.target.value ? parseFloat(e.target.value) : '')}
                  placeholder="500"
                  min={0}
                  step={0.01}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notes & Status */}
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Additional notes about this supplier..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
          />
        </div>

        {isEditing && (
          <div className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500/50"
              />
              <span className="text-white">Active Supplier</span>
            </label>
            <span className="text-sm text-slate-400">
              Inactive suppliers won&apos;t appear in PO creation
            </span>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default SupplierModal;
