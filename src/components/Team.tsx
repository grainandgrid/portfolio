import ProfileCard from './ProfileCard';

type TeamProfile = {
  name: string;
  title: string;
  handle: string;
  status: string;
  avatarUrl: string;
  behindGlowColor: string;
  innerGradient: string;
};

const TEAM_PROFILES: TeamProfile[] = [
  {
    name: 'Eshaan Sarkar',
    title: 'CEO',
    handle: 'sarkareshaan@gmail.com',
    status: 'Online',
    avatarUrl: '/assets/team/eshaan.jpg',
    behindGlowColor: 'hsla(18, 100%, 70%, 0.55)',
    innerGradient: 'linear-gradient(145deg, hsla(18, 40%, 45%, 0.55) 0%, hsla(250, 60%, 70%, 0.27) 100%)',
  },
  {
    name: 'Sourya Paul',
    title: 'COO',
    handle: 'souryapaul2007@gmail.com',
    status: 'Online',
    avatarUrl: '/assets/team/sourya.jpg',
    behindGlowColor: 'hsla(180, 85%, 65%, 0.45)',
    innerGradient: 'linear-gradient(145deg, hsla(182, 45%, 36%, 0.52) 0%, hsla(224, 60%, 64%, 0.24) 100%)',
  },
  {
    name: 'Dwijagro Sengupta',
    title: 'CFO',
    handle: 'dwijagrosengupta@gmail.com',
    status: 'Online',
    avatarUrl: '/assets/team/dwijagro.jpg',
    behindGlowColor: 'hsla(42, 95%, 65%, 0.45)',
    innerGradient: 'linear-gradient(145deg, hsla(42, 58%, 43%, 0.52) 0%, hsla(28, 78%, 63%, 0.24) 100%)',
  },
];

export function Team() {
  return (
    <section id="team" className="relative overflow-hidden bg-bg px-8 py-24 md:px-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-fg/10 blur-3xl" />
        <div className="absolute -right-20 bottom-4 h-80 w-80 rounded-full bg-fg/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <p className="mb-5 text-xs uppercase tracking-[0.45em] opacity-60">Leadership</p>
        <h2 className="mb-12 text-4xl font-serif italic leading-tight md:mb-16 md:text-7xl">
          The Team Behind
          <span className="ml-3 font-sans text-3xl not-italic font-black uppercase tracking-tight md:text-6xl">Grain &amp; Grid</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {TEAM_PROFILES.map((profile) => (
            <ProfileCard
              key={profile.name}
              name={profile.name}
              title={profile.title}
              handle={profile.handle}
              status={profile.status}
              avatarUrl={profile.avatarUrl}
              showUserInfo
              enableTilt
              enableMobileTilt
              behindGlowColor={profile.behindGlowColor}
              iconUrl="/assets/demo/iconpattern.svg"
              behindGlowEnabled
              innerGradient={profile.innerGradient}
              behindGlowSize="50%"
              miniAvatarUrl={profile.avatarUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}