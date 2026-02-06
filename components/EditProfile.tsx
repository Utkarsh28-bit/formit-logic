import React, { useState, useEffect } from 'react';
import { UserProfile, DietType, Allergy } from '../types';
import { calculateLevel } from '../services/workoutLogic';
import { ArrowLeft, Save, User, Ruler, Weight, Award, Utensils, AlertTriangle } from 'lucide-react';

interface Props {
  currentProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
}

const EditProfile: React.FC<Props> = ({ currentProfile, onSave, onCancel }) => {
  const [profile, setProfile] = useState<UserProfile>(currentProfile);
  const [level, setLevel] = useState('');

  useEffect(() => {
    setLevel(calculateLevel(profile.experienceYears));
  }, [profile.experienceYears]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col max-w-xl mx-auto animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onCancel} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
           <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <p className="text-slate-400 text-xs">Update your metrics & preferences</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1 overflow-y-auto pb-20">
        
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <User size={16} className="text-blue-400" /> Display Name
          </label>
          <input
            required
            type="text"
            className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder:text-slate-600 font-medium"
            value={profile.name}
            onChange={e => setProfile({ ...profile, name: e.target.value })}
          />
        </div>

        {/* Body Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Ruler size={16} className="text-emerald-400" /> Height (cm)
            </label>
            <input
              required
              type="number"
              className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-white font-mono"
              value={profile.heightCm}
              onChange={e => setProfile({ ...profile, heightCm: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Weight size={16} className="text-emerald-400" /> Weight (kg)
            </label>
            <input
              required
              type="number"
              className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-white font-mono"
              value={profile.weightKg}
              onChange={e => setProfile({ ...profile, weightKg: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Award size={16} className="text-amber-400" /> Experience (Years)
            </label>
            <span className="text-xs font-bold uppercase tracking-wider bg-slate-700 text-slate-300 px-2 py-1 rounded">
              Level: <span className="text-white">{level}</span>
            </span>
          </div>
          <input
            required
            type="number"
            step="0.5"
            className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-white font-mono"
            value={profile.experienceYears}
            onChange={e => setProfile({ ...profile, experienceYears: Number(e.target.value) })}
          />
          <p className="text-xs text-slate-500">
            {level === 'Beginner' && "Focus on form and consistency."}
            {level === 'Intermediate' && "Good time for progressive overload."}
            {level === 'Advanced' && "High volume and specialization recommended."}
          </p>
        </div>

        {/* Diet & Allergies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Utensils size={16} className="text-pink-400" /> Diet Type
            </label>
            <select
              className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
              value={profile.diet}
              onChange={e => setProfile({ ...profile, diet: e.target.value as DietType })}
            >
              {Object.values(DietType).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-400" /> Allergies
            </label>
            <select
              className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
              value={profile.allergy}
              onChange={e => setProfile({ ...profile, allergy: e.target.value as Allergy })}
            >
              {Object.values(Allergy).map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all active:scale-95 mt-8"
        >
          <Save size={20} /> Save Changes
        </button>

      </form>
    </div>
  );
};

export default EditProfile;