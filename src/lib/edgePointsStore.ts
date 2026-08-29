/**
 * Edge Compute Points & On-Device Local LLM Store
 *
 * Tracks gamified points earned from running local/on-device AI inference,
 * mobile edge model benchmarks, air-gapped privacy tasks, and carbon savings.
 */

export interface LocalModelOption {
  id: string;
  name: string;
  architecture: string;
  sizeMb: number;
  tokensPerSec: number;
  quantization: '4-bit (AWQ)' | '8-bit (INT8)' | 'FP16';
  idealFor: string;
  vramUsageMb: number;
  engine: 'WebGPU' | 'ONNX Runtime Web' | 'WASM-SIMD' | 'NPU Edge';
}

export interface EdgeQuest {
  id: string;
  title: string;
  description: string;
  rewardPoints: number;
  progress: number;
  target: number;
  completed: boolean;
  claimed: boolean;
  category: 'inference' | 'code' | 'benchmark' | 'streak';
}

export interface EdgeComputeLog {
  id: string;
  timestamp: string;
  model: string;
  taskType: string;
  tokensGenerated: number;
  latencyMs: number;
  tokensPerSec: number;
  isLocal: boolean;
  pointsEarned: number;
  bandwidthSavedKb: number;
}

export interface EdgePointsState {
  totalPoints: number;
  cloudInferencesCount: number;
  localInferencesCount: number;
  totalTokensGenerated: number;
  bandwidthSavedMb: number;
  carbonOffsetGrams: number;
  offlineStreakDays: number;
  currentTier: 'Cloud Explorer' | 'Edge Pilot' | 'Local Neural Node' | 'On-Device AI Master';
  tierProgressPct: number;
  activeModelId: string;
  quests: EdgeQuest[];
  recentLogs: EdgeComputeLog[];
  hardwareStatus: {
    webGpuSupported: boolean;
    npuDetected: boolean;
    deviceMemoryGb: number;
    activeVramMb: number;
    avgTokensPerSec: number;
  };
}

export const AVAILABLE_LOCAL_MODELS: LocalModelOption[] = [
  {
    id: 'gemma-2b-edge',
    name: 'Gemma 2B Edge-NPU (Google)',
    architecture: 'Gemma-2B-Instruct',
    sizeMb: 1450,
    tokensPerSec: 46.5,
    quantization: '4-bit (AWQ)',
    idealFor: 'Complex reasoning, academic explanations, and Vernacular Q&A',
    vramUsageMb: 1250,
    engine: 'WebGPU',
  },
  {
    id: 'smollm-360m',
    name: 'SmolLM 360M Ultra-Fast Mobile',
    architecture: 'SmolLM-360M',
    sizeMb: 240,
    tokensPerSec: 78.2,
    quantization: '4-bit (AWQ)',
    idealFor: 'Instant 0ms mobile responses, flashcards, and quick summaries',
    vramUsageMb: 220,
    engine: 'WASM-SIMD',
  },
  {
    id: 'qwen-05b-coder',
    name: 'Qwen 2.5 Coder 0.5B (Edge)',
    architecture: 'Qwen-2.5-0.5B-Code',
    sizeMb: 420,
    tokensPerSec: 58.0,
    quantization: '4-bit (AWQ)',
    idealFor: 'AST code reviews, syntax error fixes, and algorithm analysis',
    vramUsageMb: 380,
    engine: 'WebGPU',
  },
  {
    id: 'tinyllama-11b',
    name: 'TinyLlama 1.1B Sovereign Node',
    architecture: 'Llama-Architecture',
    sizeMb: 680,
    tokensPerSec: 52.4,
    quantization: '4-bit (AWQ)',
    idealFor: 'Air-gapped full syllabus tutoring & conceptual analogies',
    vramUsageMb: 590,
    engine: 'ONNX Runtime Web',
  },
  {
    id: 'mobilebert-edge',
    name: 'MobileBERT Edge Examiner',
    architecture: 'BERT-Compact',
    sizeMb: 95,
    tokensPerSec: 110.0,
    quantization: '8-bit (INT8)',
    idealFor: 'Instant quiz grading, multiple-choice evaluation, and concept tagging',
    vramUsageMb: 85,
    engine: 'NPU Edge',
  },
];

const INITIAL_QUESTS: EdgeQuest[] = [
  {
    id: 'quest-1',
    title: 'Run 3 On-Device LLM Inferences',
    description: 'Execute prompt generation locally on your browser/phone without sending data to cloud.',
    rewardPoints: 150,
    progress: 2,
    target: 3,
    completed: false,
    claimed: false,
    category: 'inference',
  },
  {
    id: 'quest-2',
    title: 'Local AST Code Debugger Speedrun',
    description: 'Use Qwen 2.5 Coder Edge to analyze and repair memory safety bugs offline.',
    rewardPoints: 100,
    progress: 1,
    target: 1,
    completed: true,
    claimed: false,
    category: 'code',
  },
  {
    id: 'quest-3',
    title: 'Run WebGPU NPU Benchmark',
    description: 'Benchmark your local device token generation rate and FLOP throughput.',
    rewardPoints: 120,
    progress: 1,
    target: 1,
    completed: true,
    claimed: true,
    category: 'benchmark',
  },
  {
    id: 'quest-4',
    title: '5-Day Air-Gapped Study Streak',
    description: 'Study 5 days consecutively using 100% offline edge models.',
    rewardPoints: 300,
    progress: 4,
    target: 5,
    completed: false,
    claimed: false,
    category: 'streak',
  },
];

const INITIAL_LOGS: EdgeComputeLog[] = [
  {
    id: 'log-1',
    timestamp: '2 mins ago',
    model: 'Gemma 2B Edge-NPU',
    taskType: 'CSE Operating Systems Paging QA',
    tokensGenerated: 245,
    latencyMs: 12,
    tokensPerSec: 48.2,
    isLocal: true,
    pointsEarned: 100,
    bandwidthSavedKb: 450,
  },
  {
    id: 'log-2',
    timestamp: '15 mins ago',
    model: 'Qwen 2.5 Coder 0.5B',
    taskType: 'Rust Borrow Checker Memory Fix',
    tokensGenerated: 310,
    latencyMs: 8,
    tokensPerSec: 56.4,
    isLocal: true,
    pointsEarned: 125,
    bandwidthSavedKb: 620,
  },
  {
    id: 'log-3',
    timestamp: '1 hour ago',
    model: 'SmolLM 360M Ultra-Fast',
    taskType: 'Database Indexing Flashcard Summary',
    tokensGenerated: 180,
    latencyMs: 4,
    tokensPerSec: 72.0,
    isLocal: true,
    pointsEarned: 75,
    bandwidthSavedKb: 280,
  },
];

const LOCAL_STORAGE_EDGE_KEY = 'eduagent_edge_points_state_v1';

export function getEdgePointsState(): EdgePointsState {
  if (typeof window === 'undefined') {
    return createDefaultEdgeState();
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_EDGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed;
    }
  } catch (e) {
    console.warn('Error reading edge points state:', e);
  }
  const defaultState = createDefaultEdgeState();
  saveEdgePointsState(defaultState);
  return defaultState;
}

function createDefaultEdgeState(): EdgePointsState {
  return {
    totalPoints: 1450,
    cloudInferencesCount: 14,
    localInferencesCount: 28,
    totalTokensGenerated: 18450,
    bandwidthSavedMb: 42.8,
    carbonOffsetGrams: 168.5,
    offlineStreakDays: 4,
    currentTier: 'Edge Pilot',
    tierProgressPct: 68,
    activeModelId: 'gemma-2b-edge',
    quests: INITIAL_QUESTS,
    recentLogs: INITIAL_LOGS,
    hardwareStatus: {
      webGpuSupported: true,
      npuDetected: true,
      deviceMemoryGb: 8,
      activeVramMb: 1250,
      avgTokensPerSec: 52.8,
    },
  };
}

export function saveEdgePointsState(state: EdgePointsState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_EDGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event('eduagent_edge_points_updated'));
  } catch (e) {
    console.warn('Error saving edge points state:', e);
  }
}

export function earnEdgePoints(
  reason: string,
  isLocal: boolean = true,
  tokensCount: number = 200,
  modelName: string = 'Gemma 2B Edge-NPU',
  latencyMs: number = 10
): { pointsAwarded: number; newTotal: number } {
  const state = getEdgePointsState();
  // Local models award 2x to 3x points compared to cloud!
  const basePoints = isLocal ? 100 : 25;
  const multiplier = isLocal ? 2.5 : 1.0;
  const pointsAwarded = Math.round(basePoints * (tokensCount > 300 ? 1.25 : 1.0));

  const newTotal = state.totalPoints + pointsAwarded;
  const newLocalCount = isLocal ? state.localInferencesCount + 1 : state.localInferencesCount;
  const newCloudCount = !isLocal ? state.cloudInferencesCount + 1 : state.cloudInferencesCount;
  const newTokens = state.totalTokensGenerated + tokensCount;
  const bandwidthSavedMb = isLocal ? +(state.bandwidthSavedMb + tokensCount * 0.002).toFixed(2) : state.bandwidthSavedMb;
  const carbonSaved = isLocal ? +(state.carbonOffsetGrams + tokensCount * 0.008).toFixed(1) : state.carbonOffsetGrams;

  // Calculate tier
  let currentTier: EdgePointsState['currentTier'] = 'Cloud Explorer';
  let tierProgressPct = 20;
  if (newTotal >= 3500) {
    currentTier = 'On-Device AI Master';
    tierProgressPct = 100;
  } else if (newTotal >= 2000) {
    currentTier = 'Local Neural Node';
    tierProgressPct = Math.round(((newTotal - 2000) / 1500) * 100);
  } else if (newTotal >= 800) {
    currentTier = 'Edge Pilot';
    tierProgressPct = Math.round(((newTotal - 800) / 1200) * 100);
  } else {
    currentTier = 'Cloud Explorer';
    tierProgressPct = Math.round((newTotal / 800) * 100);
  }

  // Update quests
  const updatedQuests = state.quests.map((q) => {
    if (q.id === 'quest-1' && isLocal) {
      const nextProg = Math.min(q.target, q.progress + 1);
      return { ...q, progress: nextProg, completed: nextProg >= q.target };
    }
    return q;
  });

  const newLog: EdgeComputeLog = {
    id: `log-${Date.now()}`,
    timestamp: 'Just now',
    model: modelName,
    taskType: reason,
    tokensGenerated: tokensCount,
    latencyMs,
    tokensPerSec: +(tokensCount / Math.max(0.2, latencyMs / 1000)).toFixed(1),
    isLocal,
    pointsEarned: pointsAwarded,
    bandwidthSavedKb: Math.round(tokensCount * 2),
  };

  const updatedLogs = [newLog, ...state.recentLogs.slice(0, 9)];

  const updatedState: EdgePointsState = {
    ...state,
    totalPoints: newTotal,
    localInferencesCount: newLocalCount,
    cloudInferencesCount: newCloudCount,
    totalTokensGenerated: newTokens,
    bandwidthSavedMb,
    carbonOffsetGrams: carbonSaved,
    currentTier,
    tierProgressPct,
    quests: updatedQuests,
    recentLogs: updatedLogs,
  };

  saveEdgePointsState(updatedState);

  // Trigger telemetry sync
  try {
    fetch('/api/edge-points/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pointsAwarded,
        totalPoints: newTotal,
        modelName,
        isLocal,
        reason,
      }),
    }).catch(() => {});
  } catch (err) {}

  return { pointsAwarded, newTotal };
}

export function claimQuestReward(questId: string): number {
  const state = getEdgePointsState();
  const quest = state.quests.find((q) => q.id === questId);
  if (!quest || !quest.completed || quest.claimed) return 0;

  const reward = quest.rewardPoints;
  const newTotal = state.totalPoints + reward;

  const updatedQuests = state.quests.map((q) =>
    q.id === questId ? { ...q, claimed: true } : q
  );

  const updatedState: EdgePointsState = {
    ...state,
    totalPoints: newTotal,
    quests: updatedQuests,
  };

  saveEdgePointsState(updatedState);
  return reward;
}

export function setActiveLocalModel(modelId: string): void {
  const state = getEdgePointsState();
  const updated: EdgePointsState = {
    ...state,
    activeModelId: modelId,
  };
  saveEdgePointsState(updated);
}
