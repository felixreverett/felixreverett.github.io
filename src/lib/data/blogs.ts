// ============================================================ 
// Definition for blog cards
// (i) These values are currently only used for the
//     blog cards, but could also be used for meta
//     data in future.
// ============================================================

type Blog = {
  id: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  blogLink: string;
  wordCount?: number;
  readTime?: number;
}

// ============================================================

export const blogs: Blog[] = [
    {
      id: 1,
      imageSrc: '/images/sprite-batching-l.jpg',
      imageAlt: 'Hero image for sprite batching blog',
      title: 'Why We Use Sprite Batching in Graphics Programming',
      description: 'My experience implementing sprite batching into Isola, and what it says about coding theory.',
      blogLink: '/blog/sprite-batching',
      wordCount: 2200,
      readTime: 17,
    },
    {
      id: 2,
      imageSrc: '/images/method-chaining.jpg',
      imageAlt: 'Hero image for method chaining blog',
      title: 'Method Chaining',
      description: 'What is the method chaining style of programming and how have I managed to eke out an entire blog about it?',
      blogLink: '/blog/method-chaining',
      wordCount: 1900,
      readTime: 15,
    },
    {
      id: 3,
      imageSrc: '/images/functional-programming.jpg',
      imageAlt: 'Hero image for functional programming blog',
      title: 'What Is Functional Programming?',
      description: 'An exploration into what functional programming really means, and what it has to do with immutability and higher-order functions.',
      blogLink: '/blog/what-is-functional-programming',
      wordCount: 3400,
      readTime: 26,
    }
  ];