import { useState, useEffect, useCallback } from 'react';
import { Shield, Loader2, UserX } from 'lucide-react';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { FormField } from '@/components/admin/FormField';
import { userService } from '@/services/userService';
import { toast } from '@/store/useToastStore';
import type { UserProfile } from '@/types/api';

const ROLES = ['Member', 'Editor', 'MediaManager', 'ChurchAdmin', 'Pastor'];

const UsersManagePage = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roleItem, setRoleItem] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [deleteItem, setDeleteItem] = useState<any>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try { const data = await userService.getUsers({ pageSize: 100 }); setUsers(data.items || []); }
    catch { toast.error('Failed to load users'); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleAssignRole = async () => {
    if (!roleItem || !selectedRole) return;
    try { await userService.assignRole({ userId: roleItem.id, roleName: selectedRole }); toast.success(`Role "${selectedRole}" assigned`); setRoleItem(null); setSelectedRole(''); await fetchUsers(); }
    catch { toast.error('Failed to assign role'); }
  };

  const handleRemoveRole = async (userId: string, role: string) => {
    try { await userService.removeRole({ userId, roleName: role }); toast.success(`Role "${role}" removed`); await fetchUsers(); }
    catch { toast.error('Failed to remove role'); }
  };

  const handleDeactivate = async () => {
    if (!deleteItem) return;
    try { await userService.deactivateUser(deleteItem.id); toast.success('User deactivated'); setDeleteItem(null); await fetchUsers(); }
    catch { toast.error('Failed to deactivate user'); }
  };

  const columns = [
    { key: 'fullName', label: 'Name', sortable: true, render: (item: any) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 700 }}>{item.firstName?.[0]}{item.lastName?.[0]}</div>
        <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.fullName || `${item.firstName} ${item.lastName}`}</span>
      </div>
    )},
    { key: 'email', label: 'Email', sortable: true },
    { key: 'roles', label: 'Roles', render: (item: any) => (
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {(item.roles || []).map((r: string) => (
          <span key={r} style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 600, fontFamily: 'var(--font-accent)', background: r === 'Pastor' ? 'rgba(168,85,247,0.1)' : 'rgba(59,130,246,0.1)', color: r === 'Pastor' ? '#a855f7' : 'var(--color-primary-400)' }}>{r}</span>
        ))}
      </div>
    )},
    { key: 'isActive', label: 'Status', render: (item: any) => <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-accent)', background: item.isActive ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: item.isActive ? '#22c55e' : '#ef4444' }}>{item.isActive ? 'Active' : 'Inactive'}</span> },
    { key: 'memberSince', label: 'Joined', sortable: true, render: (item: any) => item.memberSince ? new Date(item.memberSince).toLocaleDateString() : '—' },
  ];

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><Loader2 style={{ width: '32px', height: '32px', color: 'var(--color-primary-500)', animation: 'spin 1s linear infinite' }} /></div>;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-heading)', marginBottom: '4px' }}>User Management</h1>
        <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>{users.length} members</p>
      </div>

      <DataTable data={users} columns={columns} searchPlaceholder="Search users..."
        actions={(item: any) => (
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
            <button onClick={(e) => { e.stopPropagation(); setRoleItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', color: '#a855f7', cursor: 'pointer' }} title="Manage Roles"><Shield style={{ width: '14px', height: '14px' }} /></button>
            <button onClick={(e) => { e.stopPropagation(); setDeleteItem(item); }} style={{ padding: '6px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer' }} title="Deactivate"><UserX style={{ width: '14px', height: '14px' }} /></button>
          </div>
        )}
      />

      {/* Role Management Modal */}
      <Modal isOpen={!!roleItem} onClose={() => setRoleItem(null)} title={`Manage Roles — ${roleItem?.fullName || roleItem?.firstName}`} size="sm"
        footer={<><button className="btn btn-outline btn-sm" onClick={() => setRoleItem(null)}>Close</button><button className="btn btn-primary btn-sm" onClick={handleAssignRole} disabled={!selectedRole}>Assign Role</button></>}
      >
        {roleItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', fontFamily: 'var(--font-accent)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Current Roles</label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                {(roleItem.roles || []).map((r: string) => (
                  <span key={r} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-accent)', background: 'rgba(59,130,246,0.08)', color: 'var(--color-primary-400)' }}>
                    {r}
                    <button onClick={() => handleRemoveRole(roleItem.id, r)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0 2px', fontSize: '14px' }}>×</button>
                  </span>
                ))}
              </div>
            </div>
            <FormField label="Add Role" type="select" value={selectedRole} onChange={setSelectedRole} options={ROLES.filter(r => !(roleItem.roles || []).includes(r)).map(r => ({ label: r, value: r }))} />
          </div>
        )}
      </Modal>

      <Modal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} title="Deactivate User" size="sm" footer={<><button className="btn btn-outline btn-sm" onClick={() => setDeleteItem(null)}>Cancel</button><button className="btn btn-sm" style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-accent)', fontWeight: 600, fontSize: '13px' }} onClick={handleDeactivate}>Deactivate</button></>}>
        <p style={{ fontSize: '14px', fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)' }}>Deactivate <strong style={{ color: 'var(--text-heading)' }}>{deleteItem?.fullName || deleteItem?.email}</strong>?</p>
      </Modal>
    </div>
  );
};

export default UsersManagePage;
