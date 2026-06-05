import { motion } from 'framer-motion';
const FacebookIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const TwitterIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const InstagramIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
import type { TeamMember } from '@/types/team';

interface TeamMemberCardProps {
  member: TeamMember;
  index?: number;
}

export const TeamMemberCard = ({ member, index = 0 }: TeamMemberCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group text-center"
    >
      {/* Image Area */}
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, #1e3a8a ${30 + index * 10}%, #3b82f6 100%)`,
          }}
        />
        
        {/* Initials */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-heading font-bold text-white/30">
            {member.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>

        {/* Social Links Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            {member.socialLinks.facebook && (
              <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors text-white">
                <FacebookIcon />
              </a>
            )}
            {member.socialLinks.twitter && (
              <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors text-white">
                <TwitterIcon />
              </a>
            )}
            {member.socialLinks.instagram && (
              <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors text-white">
                <InstagramIcon />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold mb-1" style={{ color: 'var(--text-heading)' }}>
          {member.name}
        </h3>
        <p className="text-xs font-accent font-semibold tracking-wider uppercase" style={{ color: 'var(--color-primary-500)' }}>
          {member.role}
        </p>
      </div>
    </motion.div>
  );
};
