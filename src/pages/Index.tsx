import { Code2, Palette } from 'lucide-react';
import UnicornBackground from '@/components/UnicornBackground';
import ProjectCard from '@/components/ProjectCard';

const Index = () => {
  const projects = [
    {
      icon: Code2,
      title: 'Codevance',
      description: 'Advanced coding platform',
      href: 'https://code.endiidishishir.qzz.io',
    },
    {
      icon: Palette,
      title: 'Niora',
      description: 'Ambient,smooth music',
      href: 'https://music.endiidishishir.qzz.io',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <UnicornBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">
              My Projects
            </h1>
          </div>
          
          <div className="space-y-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                icon={project.icon}
                title={project.title}
                description={project.description}
                href={project.href}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
