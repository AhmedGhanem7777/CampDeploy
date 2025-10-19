
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Target, Compass } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const AboutUs = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>من نحن | Camply</title>
        <meta name="description" content="تعرف على قصة Camply ورؤيتنا في جعل الطبيعة أقرب للجميع." />
      </Helmet>
      <div className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">عن Camply</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            نحن نؤمن بأن أفضل الذكريات تُصنع في الهواء الطلق. مهمتنا هي ربط الناس بالطبيعة من خلال تجارب تخييم لا تُنسى.
          </p>
        </motion.div>

        <div className="relative mb-20">
          <img className="w-full h-96 object-cover rounded-lg shadow-lg" alt="Team of explorers looking at a map in a forest" src="https://images.unsplash.com/photo-1515966071294-08f1d52f6246" />
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">من نحن</h2>
            <p className="text-muted-foreground">
              نحن فريق من عشاق الطبيعة والمغامرين والمطورين الذين اجتمعوا لجعل استكشاف العالم أسهل وأكثر متعة.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Target className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">مهمتنا</h2>
            <p className="text-muted-foreground">
              تسهيل الوصول إلى تجارب الطبيعة الفريدة من خلال منصة موثوقة وسهلة الاستخدام تجمع بين أفضل المخيمات والمغامرين.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Compass className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">رؤيتنا</h2>
            <p className="text-muted-foreground">
              أن نكون البوابة الأولى لكل من يبحث عن مغامرة في الهواء الطلق، وإلهام جيل جديد من محبي الطبيعة.
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutUs;
  


















