import React from 'react';

const teamMembers = [
  {
    name: "John Smith",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    bio: "20+ years experience in automotive industry"
  },
  {
    name: "Sarah Johnson",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
    bio: "Expert in supply chain management"
  },
  {
    name: "Michael Chen",
    role: "Technical Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    bio: "Leading our platform development"
  }
];

const milestones = [
  {
    year: "2023",
    achievement: "Platform Launch",
    description: "Successfully launched AutoPartsHub platform"
  },
  {
    year: "2024",
    achievement: "10,000+ Sellers",
    description: "Reached milestone of 10,000 active sellers"
  },
  {
    year: "2025",
    achievement: "Global Expansion",
    description: "Expanded operations to 50+ countries"
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About AutoPartsHub</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Revolutionizing the automotive parts industry through innovative technology and trusted partnerships.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                At AutoPartsHub, we're committed to transforming the automotive parts industry by connecting quality sellers with enthusiastic buyers. Our platform provides cutting-edge tools and resources to help auto parts businesses thrive in the digital age.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-24 pt-1">
                    <span className="text-blue-600 font-bold">{milestone.year}</span>
                  </div>
                  <div className="flex-grow bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-2">{milestone.achievement}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Quality First</h3>
              <p className="text-gray-600">
                We ensure all parts on our platform meet strict quality standards.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                Continuously improving our platform with cutting-edge technology.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Trust</h3>
              <p className="text-gray-600">
                Building lasting relationships with our sellers and buyers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
