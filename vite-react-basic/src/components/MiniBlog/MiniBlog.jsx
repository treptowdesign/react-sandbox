import React, { useState } from 'react';
import './MiniBlog.sass';
import Navi from '@/components/Navi/Navi';

//////////////////////////////////////////////////////////
// Data 
//////////////////////////////////////////////////////////

const seedData = [
    {
        title: 'Sample Post Number One',
        content: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Consectetur curabitur fermentum semper cubilia maecenas natoque proin. Ultrices sed consectetur taciti interdum purus taciti.',
        featured: false,
        author: 'Steve Stephens',
        postDate: '2024-12-06'
    },
    {
        title: 'The Second Post',
        content: 'Lacinia suspendisse primis; posuere cursus auctor felis. Vitae nisi non lectus facilisis ultricies torquent facilisi. Tortor vestibulum suspendisse nulla nulla finibus arcu lobortis praesent.',
        featured: false,
        author: 'James Glibson',
        postDate: '2024-12-06'
    },
    {
        title: 'Third Post in the Series',
        content: 'Magna arcu nisl viverra consectetur per mollis ridiculus. Urna penatibus ultricies aliquet felis posuere at proin. Maximus orci dui pellentesque imperdiet maximus parturient risus eros.',
        featured: true,
        author: 'Tad Jackson',
        postDate: '2024-12-06'
    },
    {
        title: 'Post Number Four',
        content: 'Ut non congue amet dictum; nibh nunc bibendum cubilia. Penatibus eu curae habitasse leo fermentum. Nullam sed nisl auctor torquent taciti in ullamcorper faucibus. ',
        featured: true,
        author: 'Sal Marksman',
        postDate: '2024-12-06'
    },
    
];

const MiniBlog = () => {
    const [posts, setPosts] = useState(seedData);

    const postList = posts.map((post, index) => {
        return (
            <li key={index}>
                {post.title} <button>View Post</button>
            </li>
        ); 
    });

  return (
    <>
      <Navi />
      <h1>MiniBlog</h1>
      <div className="mini-blog">
        <aside>
            <ul>
                {postList}
            </ul>
        </aside>
        <main>
            Main Content Area
        </main>
      </div>
    </>
  );
};

export default MiniBlog; 
