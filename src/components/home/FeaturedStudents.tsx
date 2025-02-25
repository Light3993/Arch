import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

// Interface pour les étudiants
interface Student {
  id: number;
  name: string;
  image: string;
  achievements: string[];
  year: number;
  description: string;
  specialization: string;
}

// Données des étudiants marquants
const students: Student[] = [
  {
    id: 1,
    name: "Kokou AMEGBO",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop",
    achievements: [
      "Major de promotion 2023",
      "Prix d'excellence en Génie Logiciel",
      "Stage à Microsoft Africa"
    ],
    year: 2023,
    description: "Spécialisé en Intelligence Artificielle et Big Data, Kokou a développé plusieurs projets innovants durant son parcours à l'EPL.",
    specialization: "IABD"
  },
  {
    id: 2,
    name: "Ama KOFFI",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    achievements: [
      "Projet innovant en IA",
      "Stage à Google Africa",
      "Publication scientifique internationale"
    ],
    year: 2023,
    description: "Passionnée par l'intelligence artificielle, Ama a contribué à plusieurs projets de recherche en collaboration avec des universités internationales.",
    specialization: "IABD"
  },
  {
    id: 3,
    name: "Yao MENSAH",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    achievements: [
      "Premier prix au hackathon AfricaTech",
      "Création d'une startup EdTech",
      "Mentor pour les nouveaux étudiants"
    ],
    year: 2022,
    description: "Entrepreneur dans l'âme, Yao a créé sa startup EdTech pendant ses études et continue d'innover dans le domaine de l'éducation numérique.",
    specialization: "GL"
  }
];

export const FeaturedStudents = () => {
  // État pour la navigation du carousel
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);

  // Fonction pour naviguer dans le carousel
  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex(current => (current === 0 ? students.length - 1 : current - 1));
    } else {
      setCurrentIndex(current => (current === students.length - 1 ? 0 : current + 1));
    }
  };

  // Animation variants pour Framer Motion
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Étudiants Remarquables
        </h2>

        {/* Carousel de cartes d'étudiants */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex">
              <button
                onClick={() => navigate('prev')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
              >
                <ChevronLeft size={24} />
              </button>

              <motion.div
                key={currentIndex}
                custom={currentIndex}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    students[(currentIndex - 1 + students.length) % students.length],
                    students[currentIndex],
                    students[(currentIndex + 1) % students.length]
                  ].map((student, index) => (
                    <motion.div
                      key={student.id}
                      whileHover={{ scale: 1.05 }}
                      className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                        index === 1 ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="relative">
                        <img
                          src={student.image}
                          alt={student.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                          Promotion {student.year}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{student.name}</h3>
                        <p className="text-gray-600 mb-4">{student.specialization}</p>
                        <ul className="space-y-2">
                          {student.achievements.slice(0, 2).map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <Award size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
                        >
                          Voir le profil
                          <ExternalLink size={16} className="ml-1" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <button
                onClick={() => navigate('next')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal de détail étudiant */}
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg max-w-2xl w-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedStudent.image}
                  alt={selectedStudent.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedStudent.name}</h3>
                <p className="text-gray-600 mb-4">{selectedStudent.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Réalisations</h4>
                  <ul className="space-y-2">
                    {selectedStudent.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <Award size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};