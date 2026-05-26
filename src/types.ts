/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MedicalRecord {
  id: string;
  institution: string;
  code: string;
  description: string;
  issuedDate: string;
  verified: boolean;
  status: string;
  iconType: 'ent' | 'clinic' | 'general' | 'dental';
  amount?: string;
  fileName?: string;
}

export interface HospitalRanking {
  rank: number;
  name: string;
  txCount: number;
  statusType: 'exploding' | 'rising' | 'stable';
  nodesCount: number;
}

export interface ActivityLog {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status?: string;
  type: 'record' | 'claim';
  amount?: string;
}

export type TabType = 'home' | 'wallet' | 'ranking' | 'profile';
