export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isDoctor: boolean;
}

export interface EmergencyAlert {
  id: string;
  heartRate: number;
  timestamp: number;
  severity: 'critical' | 'severe' | 'moderate';
  message: string;
  voiceMessage?: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
}