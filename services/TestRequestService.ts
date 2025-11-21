import { supabase } from '../lib/supabase';

export interface TestRequest {
  id: string;
  patient_name: string;
  patient_id: string;
  doctor_name: string;
  hospital_name: string;
  tests: string[];
  doctor_note: string;
  status: 'pending' | 'processing' | 'completed';
  priority: 'high' | 'normal';
  created_at: string;
  updated_at: string;
}

export interface TestReport {
  id: string;
  request_id: string;
  file_name: string;
  file_type: 'pdf' | 'image';
  file_url: string;
  file_size: number;
  uploaded_at: string;
}

export interface DashboardStats {
  pending: number;
  completed: number;
  total: number;
}

class TestRequestService {
  async getTestRequests(status?: 'pending' | 'completed' | 'all'): Promise<TestRequest[]> {
    let query = supabase
      .from('test_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching test requests:', error);
      return [];
    }

    return data || [];
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const { data, error } = await supabase
      .from('test_requests')
      .select('status');

    if (error) {
      console.error('Error fetching stats:', error);
      return { pending: 0, completed: 0, total: 0 };
    }

    const pending = data.filter(r => r.status === 'pending').length;
    const completed = data.filter(r => r.status === 'completed').length;

    return {
      pending,
      completed,
      total: data.length,
    };
  }

  async getTestRequestById(id: string): Promise<TestRequest | null> {
    const { data, error } = await supabase
      .from('test_requests')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching test request:', error);
      return null;
    }

    return data;
  }

  async updateRequestStatus(id: string, status: 'pending' | 'processing' | 'completed'): Promise<boolean> {
    const { error } = await supabase
      .from('test_requests')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating request status:', error);
      return false;
    }

    return true;
  }

  async uploadTestReport(requestId: string, fileName: string, fileType: 'pdf' | 'image', fileUrl: string, fileSize: number): Promise<boolean> {
    const { error } = await supabase
      .from('test_reports')
      .insert({
        request_id: requestId,
        file_name: fileName,
        file_type: fileType,
        file_url: fileUrl,
        file_size: fileSize,
      });

    if (error) {
      console.error('Error uploading test report:', error);
      return false;
    }

    return true;
  }

  async getReportsByRequestId(requestId: string): Promise<TestReport[]> {
    const { data, error } = await supabase
      .from('test_reports')
      .select('*')
      .eq('request_id', requestId)
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error fetching reports:', error);
      return [];
    }

    return data || [];
  }
}

export const testRequestService = new TestRequestService();
