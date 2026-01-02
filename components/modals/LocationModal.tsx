'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { useApp, Location } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { MapPin, Warehouse, Package, Truck } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  editLocation?: Location | null;
}

const LOCATION_TYPES: { value: Location['type']; label: string; icon: typeof Warehouse; description: string }[] = [
  { value: 'warehouse', label: 'Warehouse', icon: Warehouse, description: 'Main storage facility' },
  { value: 'fba', label: 'FBA', icon: Package, description: 'Amazon fulfillment center' },
  { value: 'fbm', label: 'FBM', icon: Truck, description: 'Fulfilled by merchant' },
];

export function LocationModal({ isOpen, onClose, editLocation }: LocationModalProps) {
  const { state, dispatch } = useApp();
  const { success, error } = useToast();

  // Form state
  const [name, setName] = useState('');
  const [type, setType] = useState<Location['type']>('warehouse');
  const [address, setAddress] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!editLocation;

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (editLocation) {
        setName(editLocation.name);
        setType(editLocation.type);
        setAddress(editLocation.address || '');
        setIsDefault(editLocation.isDefault);
      } else {
        setName('');
        setType('warehouse');
        setAddress('');
        setIsDefault(state.locations.length === 0);
      }
    }
  }, [isOpen, editLocation, state.locations.length]);

  // Validation
  const isValid = name.trim().length > 0;

  // Handle save
  const handleSave = () => {
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      // If setting as default, unset other defaults first
      if (isDefault && !editLocation?.isDefault) {
        state.locations.forEach(loc => {
          if (loc.isDefault) {
            dispatch({
              type: 'UPDATE_LOCATION',
              payload: { ...loc, isDefault: false },
            });
          }
        });
      }

      const locationData: Location = {
        id: editLocation?.id || crypto.randomUUID(),
        name: name.trim(),
        type,
        address: address.trim() || undefined,
        isDefault,
      };

      if (isEditing) {
        dispatch({ type: 'UPDATE_LOCATION', payload: locationData });
        success(`Location "${name}" updated`);
      } else {
        dispatch({ type: 'ADD_LOCATION', payload: locationData });
        success(`Location "${name}" added`);
      }

      onClose();
    } catch (err) {
      error('Failed to save location');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Location' : 'Add Location'}
      subtitle={isEditing ? `Editing ${editLocation?.name}` : 'Create a new warehouse or fulfillment location'}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Location'}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Location Name */}
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Location Name *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g., Main Warehouse, FBA - Phoenix"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            autoFocus
          />
        </div>

        {/* Location Type */}
        <div>
          <label className="block text-sm text-slate-400 mb-3">Location Type *</label>
          <div className="grid grid-cols-3 gap-3">
            {LOCATION_TYPES.map(locType => {
              const Icon = locType.icon;
              const isSelected = type === locType.value;

              return (
                <button
                  key={locType.value}
                  type="button"
                  onClick={() => setType(locType.value)}
                  className={`
                    flex flex-col items-center gap-2 p-4 rounded-lg border transition-all
                    ${isSelected
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                    }
                  `}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{locType.label}</span>
                  <span className="text-xs text-slate-500">{locType.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Address (Optional)</label>
          <textarea
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Full address or location details..."
            rows={2}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
          />
        </div>

        {/* Default Location Toggle */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <Toggle
            checked={isDefault}
            onChange={setIsDefault}
            label="Default Location"
            description="New inventory and received items will be added to this location by default"
          />
        </div>
      </div>
    </Modal>
  );
}

export default LocationModal;
