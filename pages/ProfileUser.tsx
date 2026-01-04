
import React, { useState } from 'react';
import { 
  X, User, MapPin, Settings as SettingsIcon, Camera, CheckCircle, Save, RotateCcw
} from 'lucide-react';
import { TopStatsBar } from '../components/TopStatsBar';

interface AdminInfo {
  name: string;
  username: string;
  gender: string;
  photo: string;
}

interface ProfileUserProps {
  adminInfo: AdminInfo;
  setAdminInfo: React.Dispatch<React.SetStateAction<AdminInfo>>;
  onBack: () => void;
}

export const ProfileUser: React.FC<ProfileUserProps> = ({ adminInfo, setAdminInfo, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState(adminInfo);

  const handleSave = () => {
    setAdminInfo(tempInfo);
    setIsEditing(false);
    alert('Profil Admin berhasil diperbarui!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you'd upload this. Here we use a fake URL.
      setTempInfo({ ...tempInfo, photo: URL.createObjectURL(e.target.files[0]) });
    }
  };

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <TopStatsBar />

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-slate-700 flex items-center gap-2">
           <User className="text-blue-600" size={24} /> Profil Admin
        </h1>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          SETTINGS / <span className="text-blue-500">Profile User</span>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden max-w-5xl">
        <div className="p-4 border-b border-slate-100 font-bold text-slate-600 bg-slate-50/30 text-sm flex justify-between items-center">
          <span>Pengaturan Akun Admin</span>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-700 text-xs font-bold"
            >
              Edit Profil
            </button>
          )}
        </div>

        <div className="p-12">
          <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-8 flex flex-col md:flex-row gap-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex-1 space-y-8 relative z-10">
              {isEditing ? (
                <div className="space-y-4 max-w-sm">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Lengkap</label>
                    <input 
                      type="text" 
                      value={tempInfo.name} 
                      onChange={e => setTempInfo({...tempInfo, name: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jenis Kelamin</label>
                    <select 
                      value={tempInfo.gender} 
                      onChange={e => setTempInfo({...tempInfo, gender: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option>Laki-Laki</option>
                      <option>Perempuan</option>
                    </select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-100">
                      <Save size={14} /> Simpan
                    </button>
                    <button onClick={() => { setIsEditing(false); setTempInfo(adminInfo); }} className="bg-slate-200 text-slate-600 px-4 py-2 rounded text-xs font-bold flex items-center gap-2">
                      <RotateCcw size={14} /> Batal
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <h3 className="text-blue-500 font-black text-2xl tracking-tight uppercase">Admin Kontrol Panel</h3>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">{adminInfo.name}</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-blue-500"><User size={16} /></div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Username</p>
                        <p className="text-sm font-bold text-slate-700">{adminInfo.username}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-blue-500"><SettingsIcon size={16} /></div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jenis Kelamin</p>
                        <p className="text-sm font-bold text-slate-700">{adminInfo.gender}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="shrink-0 flex flex-col items-center justify-center relative">
              <div className="w-64 h-64 bg-white rounded shadow-2xl border-4 border-white overflow-hidden relative group">
                <img src={isEditing ? tempInfo.photo : adminInfo.photo} alt="Avatar" className="w-full h-full object-cover" />
                
                {isEditing && (
                  <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white mb-2" size={32} />
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">Ubah Foto</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                )}
                
                {!isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                    <div className="w-24 h-24 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center text-slate-800 border-4 border-slate-100">
                      <CheckCircle size={48} className="text-emerald-500" strokeWidth={2.5} />
                    </div>
                  </div>
                )}
              </div>
              
              <button onClick={onBack} className="mt-8 px-6 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                <X size={14} /> Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
