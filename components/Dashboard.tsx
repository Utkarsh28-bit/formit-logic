import React, { useState, useEffect } from 'react';
import { UserProfile, WorkoutPlan, Exercise } from '../types';
import { calculateLevel, calculateProteinTarget } from '../services/workoutLogic';
import { Dumbbell, Utensils, Activity, ChevronRight, Wand2, BookOpen, Plus, Trash2, Calendar, TrendingUp, Settings, PlusCircle, X, CheckCircle } from 'lucide-react';
import { EXERCISES } from '../constants';
import { getPlans, deletePlan, getHistoryForExercise, saveLog, getLastLog } from '../services/storageService';
import { ComposedChart, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  profile: UserProfile;
  onStartWorkout: (plan?: WorkoutPlan) => void;
  onCreatePlan: () => void;
  onViewAnalytics: () => void;
  onDietPlan: () => void;
  onImageEditor: () => void;
  onViewExercise: (id: string) => void;
  onEditProfile: () => void;
}

const Dashboard: React.FC<Props> = ({ profile, onStartWorkout, onCreatePlan, onViewAnalytics, onDietPlan, onImageEditor, onViewExercise, onEditProfile }) => {
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  
  // Quick Log State
  const [quickLogExercise, setQuickLogExercise] = useState<Exercise | null>(null);
  const [quickLogData, setQuickLogData] = useState({ weight: 0, reps: 0, rpe: 7 });

  const level = calculateLevel(profile.experienceYears);
  const protein = calculateProteinTarget(profile.weightKg);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Chart Data Preparation (Bench Press as default KPI)
  // Re-runs on every render, so updating logs will update chart
  const history = getHistoryForExercise('bench_press');
  const chartData = [...history].reverse().slice(-10).map(log => ({
    date: new Date(log.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'}),
    weight: log.weightUsed,
    reps: log.repsPerformed
  }));

  useEffect(() => {
    setPlans(getPlans());
  }, []);

  const handleDeletePlan = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Delete this routine?')) {
      deletePlan(id);
      setPlans(getPlans());
    }
  };

  const handleOpenQuickLog = (e: React.MouseEvent, exercise: Exercise) => {
    e.stopPropagation();
    const lastLog = getLastLog(exercise.id);
    setQuickLogExercise(exercise);
    setQuickLogData({
      weight: lastLog ? lastLog.weightUsed : exercise.defaultWeight,
      reps: lastLog ? lastLog.repsPerformed : exercise.targetReps,
      rpe: 8
    });
  };

  const handleSaveQuickLog = () => {
    if (!quickLogExercise) return;
    saveLog({
      id: Date.now().toString(),
      exerciseId: quickLogExercise.id,
      date: Date.now(),
      weightUsed: quickLogData.weight,
      repsPerformed: quickLogData.reps,
      rpe: quickLogData.rpe
    });
    setQuickLogExercise(null);
  };

  const todaysPlan = plans.find(p => p.day === today) || plans[0];

  // Sort plans: Weekdays first, then Flexible
  const dayOrder: Record<string, number> = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7, 'Flexible': 8 };
  const sortedPlans = [...plans].sort((a, b) => {
     const dA = dayOrder[a.day || 'Flexible'] || 9;
     const dB = dayOrder[b.day || 'Flexible'] || 9;
     return dA - dB;
  });

  return (
    <div className="p-6 max-w-xl mx-auto space-y-8 pb-20">
      <header className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white">Hi, {profile.name}</h1>
          <p className="text-slate-400 text-sm">Let's crush your goals today.</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={onEditProfile}
             className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
             aria-label="Edit Profile"
           >
             <Settings size={20} />
           </button>
           <div className="h-10 w-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-emerald-400 font-bold border border-slate-600 shadow-md">
             {profile.name[0]}
           </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-xs uppercase font-bold">Level</p>
          <p className="text-xl font-semibold text-white mt-1">{level}</p>
          <p className="text-xs text-slate-500 mt-1">{profile.experienceYears}y Exp</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-xs uppercase font-bold">Protein Goal</p>
          <p className="text-xl font-semibold text-emerald-400 mt-1">{protein}g</p>
          <p className="text-xs text-slate-500 mt-1">2g/kg Daily</p>
        </div>
      </div>

      {/* Hero: Next Workout */}
      <div 
        onClick={() => todaysPlan ? onStartWorkout(todaysPlan) : onStartWorkout()}
        className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-xl shadow-blue-900/20 cursor-pointer transition-transform active:scale-95"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-blue-100 mb-2">
             <Calendar size={20} />
             <span className="font-medium">
                {todaysPlan && todaysPlan.day === today ? "Today's Schedule" : "Suggested Workout"}
             </span>
          </div>
          {todaysPlan ? (
             <>
                <h2 className="text-3xl font-bold text-white mb-1">{todaysPlan.name}</h2>
                <p className="text-blue-200 text-sm">{todaysPlan.exerciseIds.length} Exercises</p>
             </>
          ) : (
             <>
                <h2 className="text-3xl font-bold text-white mb-1">Quick Start</h2>
                <p className="text-blue-200 text-sm">Start a freestyle session</p>
             </>
          )}
          
          <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
            START SESSION <ChevronRight size={14} />
          </div>
        </div>
        <Dumbbell className="absolute -right-4 -bottom-4 text-white opacity-10 w-32 h-32 transform group-hover:rotate-12 transition-transform" />
      </div>

      {/* Progress Chart */}
      {chartData.length > 0 && (
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-lg animate-in fade-in duration-500">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-400" /> 
                Bench Press Progress
              </h3>
              <p className="text-xs text-slate-400">Weight & Reps / Last {chartData.length} sessions</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{chartData[chartData.length - 1].weight}kg</p>
              <p className="text-xs text-slate-400">Current Max</p>
            </div>
          </div>
          
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                    dataKey="date" 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickMargin={10}
                />
                <YAxis 
                    yAxisId="left"
                    stroke="#10b981" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    domain={['dataMin - 5', 'dataMax + 5']}
                    width={30}
                    label={{ value: 'kg', angle: -90, position: 'insideLeft', fill: '#10b981', fontSize: 10 }}
                />
                <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#3b82f6" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    width={30}
                    label={{ value: 'reps', angle: 90, position: 'insideRight', fill: '#3b82f6', fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                />
                <Bar 
                    yAxisId="right"
                    dataKey="reps" 
                    barSize={20} 
                    fill="#3b82f6" 
                    opacity={0.3} 
                    radius={[4, 4, 0, 0]} 
                    name="Reps"
                />
                <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorWeight)" 
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
                    name="Weight (kg)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Routine Management */}
      <div>
         <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-white">My Routines</h3>
            <button 
              onClick={onCreatePlan}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 px-3 py-1.5 rounded-full font-bold border border-slate-700 flex items-center gap-1"
            >
              <Plus size={14} /> New
            </button>
         </div>
         
         <div className="grid gap-3">
           {plans.length === 0 && (
             <div className="p-8 text-center bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
               <p className="text-slate-500 text-sm">No routines created yet.</p>
             </div>
           )}
           {sortedPlans.map(plan => (
             <div 
               key={plan.id}
               onClick={() => onStartWorkout(plan)}
               className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 transition-all cursor-pointer active:scale-[0.99] group"
             >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                    plan.day === today ? 'bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/50' : 'bg-indigo-500/20 text-indigo-400'
                  }`}>
                    {plan.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{plan.name}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-2">
                      <span className={`font-bold ${plan.day === today ? 'text-emerald-400' : ''}`}>{plan.day || 'Flexible'}</span> 
                      • {plan.exerciseIds.length} Exercises
                    </p>
                  </div>
                </div>
                <button 
                  onClick={(e) => handleDeletePlan(e, plan.id)}
                  className="p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
             </div>
           ))}
         </div>
      </div>

      {/* Tools */}
      <div className="grid grid-cols-3 gap-3">
         <button 
           onClick={onDietPlan}
           className="bg-slate-800 hover:bg-slate-750 p-3 rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-2 group h-24"
         >
            <div className="p-2 bg-emerald-500/10 rounded-full group-hover:bg-emerald-500/20 transition-colors">
              <Utensils className="text-emerald-400" size={20} />
            </div>
            <span className="text-xs font-medium text-slate-300">Diet</span>
         </button>

         <button 
           onClick={onViewAnalytics}
           className="bg-slate-800 hover:bg-slate-750 p-3 rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-2 group h-24"
         >
            <div className="p-2 bg-purple-500/10 rounded-full group-hover:bg-purple-500/20 transition-colors">
              <Activity className="text-purple-400" size={20} />
            </div>
            <span className="text-xs font-medium text-slate-300">Analytics</span>
         </button>

         <button 
           onClick={onImageEditor}
           className="bg-slate-800 hover:bg-slate-750 p-3 rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-2 group h-24"
         >
            <div className="p-2 bg-pink-500/10 rounded-full group-hover:bg-pink-500/20 transition-colors">
              <Wand2 className="text-pink-400" size={20} />
            </div>
            <span className="text-xs font-medium text-slate-300">AI Studio</span>
         </button>
      </div>

      {/* Exercise Library */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-white">
          <BookOpen size={20} className="text-slate-400" />
          <h3 className="font-bold text-lg">Exercise Library</h3>
        </div>
        <div className="space-y-3">
          {EXERCISES.map(exercise => (
            <div 
              key={exercise.id}
              onClick={() => onViewExercise(exercise.id)}
              className="flex items-center gap-4 p-3 bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 transition-all cursor-pointer active:scale-[0.98] group"
            >
               <div className="w-12 h-12 bg-slate-700 rounded-lg overflow-hidden shrink-0">
                 {exercise.gifUrl && exercise.gifUrl.endsWith('.mp4') ? (
                    <video 
                      src={exercise.gifUrl} 
                      className="w-full h-full object-cover" 
                      muted 
                      loop 
                      autoPlay 
                      playsInline 
                    />
                 ) : (
                    <img src={exercise.gifUrl} alt={exercise.name} className="w-full h-full object-cover" />
                 )}
               </div>
               <div className="flex-1">
                 <h4 className="font-bold text-white text-sm">{exercise.name}</h4>
                 <p className="text-xs text-slate-400">{exercise.muscleGroup} • {exercise.targetReps} reps target</p>
               </div>
               
               {/* Quick Log Button */}
               <button 
                 onClick={(e) => handleOpenQuickLog(e, exercise)}
                 className="p-2 bg-slate-700 text-slate-300 hover:text-white hover:bg-emerald-600 rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                 title="Quick Log"
               >
                 <PlusCircle size={20} />
               </button>
               
               <ChevronRight size={16} className="text-slate-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Log Modal */}
      {quickLogExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-slate-800 w-full max-w-sm rounded-2xl border border-slate-700 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{quickLogExercise.name}</h3>
                  <p className="text-slate-400 text-sm">Quick Add Set</p>
                </div>
                <button onClick={() => setQuickLogExercise(null)} className="p-1 text-slate-500 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Weight (kg)</label>
                    <div className="flex items-center gap-2">
                       <button onClick={() => setQuickLogData(p => ({...p, weight: p.weight - 2.5}))} className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-xl font-bold hover:bg-slate-600">-</button>
                       <input 
                         type="number"
                         value={quickLogData.weight}
                         onChange={e => setQuickLogData({...quickLogData, weight: Number(e.target.value)})}
                         className="flex-1 bg-slate-900 border border-slate-700 rounded-lg h-10 px-3 text-center font-bold text-white"
                       />
                       <button onClick={() => setQuickLogData(p => ({...p, weight: p.weight + 2.5}))} className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-xl font-bold hover:bg-slate-600">+</button>
                    </div>
                 </div>

                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Reps</label>
                    <div className="flex items-center gap-2">
                       <button onClick={() => setQuickLogData(p => ({...p, reps: p.reps - 1}))} className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-xl font-bold hover:bg-slate-600">-</button>
                       <input 
                         type="number"
                         value={quickLogData.reps}
                         onChange={e => setQuickLogData({...quickLogData, reps: Number(e.target.value)})}
                         className="flex-1 bg-slate-900 border border-slate-700 rounded-lg h-10 px-3 text-center font-bold text-white"
                       />
                       <button onClick={() => setQuickLogData(p => ({...p, reps: p.reps + 1}))} className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-xl font-bold hover:bg-slate-600">+</button>
                    </div>
                 </div>

                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">RPE (1-10)</label>
                    <input 
                      type="range"
                      min="1" max="10"
                      value={quickLogData.rpe}
                      onChange={e => setQuickLogData({...quickLogData, rpe: Number(e.target.value)})}
                      className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-center text-blue-400 font-bold mt-1">{quickLogData.rpe}</div>
                 </div>

                 <button 
                   onClick={handleSaveQuickLog}
                   className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl mt-4 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 active:scale-95 transition-all"
                 >
                   <CheckCircle size={18} /> Save Log
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;