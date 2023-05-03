import { LeadSource, LeadStatus } from '@prisma/client';

export const LEAD_SOURCES: LeadSource[] = ['referral', 'website'];

export const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'lost'];
