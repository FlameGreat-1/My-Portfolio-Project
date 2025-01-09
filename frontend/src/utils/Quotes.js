
  const mixedQuotes = [
    {
      id: 1,
      category: "Life Quote",
      quote: "Life is what happens when you're busy making other plans.",
      author: "John Lennon",
    },
    {
      id: 2,
      category: "Nature Quote",
      quote: "Look deep into nature, and then you will understand everything better.",
      author: "Albert Einstein",
    },
    {
      id: 3,
      category: "Developers Quote",
      quote: "It's not a bug, it's a feature.",
      author: "Unknown Author",
    },
    {
      id: 4,
      category: "Life Quote",
      quote: "The purpose of our lives is to be happy.",
      author: "Dalai Lama",
    },
    {
      id: 5,
      category: "Nature Quote",
      quote: "The poetry of the earth is never dead.",
      author: "John Keats",
    },
    {
      id: 6,
      category: "Developers Quote",
      quote: "Hello World!",
      author: "Unknown Author",
    },
    {
      id: 7,
      category: "Fun Quote",
      quote: "Why did the developer go broke? Because he used up all his cache!",
      author: "Unknown Author",
    },
    {
      id: 8,
      category: "Life Quote",
      quote: "To me, the only sin is mediocrity",
      author: "Martha Graham",
    },
    {
      id: 9,
      category: "Nature Quote",
      quote: "Adopt the pace of nature: her secret is patience.",
      author: "Ralph Waldo Emerson",
    },
    {
      id: 10,
      category: "Developers Quote",
      quote: "The best error message is the one that never shows up.",
      author: "Thomas Fuchs",
    },
    {
      id: 11,
      category: "Life Quote",
      quote: "Life is short, and it's up to you to make it sweet.",
      author: "Sarah Louise Delany",
    },
    {
      id: 12,
      category: "Nature Quote",
      quote: "The mountains are calling, and I must go.",
      author: "John Muir",
    },
    {
      id: 13,
      category: "Developers Quote",
      quote: "Why do programmers prefer dark mode? Because light attracts bugs!",
      author: "Unknown Author",
    },
    {
      id: 14,
      category: "Life Quote",
      quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
      author: "Albert Einstein",
    },
    {
      id: 15,
      category: "Nature Quote",
      quote: "Study nature, love nature, stay close to nature. It will never fail you.",
      author: "Frank Lloyd Wright",
    },
    {
      id: 16,
      category: "Developers Quote",
      quote: "Code is like humor. When you have to explain it, it’s bad.",
      author: "Cory House",
    },
    {
      id: 17,
      category: "Fun Quote",
      quote: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      author: "Unknown Author",
    },
    {
      id: 18,
      category: "Life Quote",
      quote: "Life is a journey that must be traveled no matter how bad the roads and accommodations.",
      author: "Oliver Goldsmith",
    },
    {
      id: 19,
      category: "Nature Quote",
      quote: "The clearest way into the Universe is through a forest wilderness.",
      author: "John Muir",
    },
    {
      id: 20,
      category: "Fun Quote",
      quote: "Why don't scientists trust atoms? Because they make up everything!",
      author: "Unknown Author",
    },
    {
      id: 21,
      category: "Life Quote",
      quote: "In a world where people sit and watch people fall, be a person who helps people climb.",
      author: "Rachel Mitchell",
    },
    {
      id: 22,
      category: "Development Quote",
      quote: "If at first you didn't succeed, call it version 1.0.",
      author: "Caelan Huntress",
    },
    {
        id: 23,
        category: "Career Quote",
        quote: "Your career is a journey, not a destination. Enjoy the ride!",
        author: "Unknown",
      },
      {
        id: 24,
        category: "Development Quote",
        quote: "Coding is not just about writing lines of code; it's about solving problems.",
        author: "Unknown",
      },
      {
        id: 25,
        category: "Technology Quote",
        quote: "Technology is best when it brings people together.",
        author: "Matt Mullenweg",
      },
      {
        id: 26,
        category: "Bible Quote",
        quote: "Trust in the Lord with all your heart and lean not on your own understanding.",
        author: "Proverbs 3:5",
      },
      {
        id: 27,
        category: "Career Quote",
        quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill",
      },
      {
        id: 28,
        category: "Development Quote",
        quote: "The best way to predict the future is to create it.",
        author: "Peter Drucker",
      },
      {
        id: 29,
        category: "Technology Quote",
        quote: "The art challenges the technology, and the technology inspires the art.",
        author: "John Lasseter",
      },
      {
        id: 30,
        category: "Bible Quote",
        quote: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
        author: "Jeremiah 29:11",
      },
      {
        id: 31,
        category: "Career Quote",
        quote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
        author: "Steve Jobs",
      },
      {
        id: 32,
        category: "Development Quote",
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        id: 33,
        category: "Technology Quote",
        quote: "The technology you use impresses no one. The experience you create with it is everything.",
        author: "Sean Gerety",
      },
      {
        id: 34,
        category: "Bible Quote",
        quote: "Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.",
        author: "Joshua 1:9",
      },
      {
        id: 35,
        category: "Career Quote",
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        id: 36,
        category: "Development Quote",
        quote: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson",
      },
      {
        id: 37,
        category: "Technology Quote",
        quote: "The technology you use impresses no one. The experience you create with it is everything.",
        author: "Sean Gerety",
      },
      {
        id: 38,
        category: "Bible Quote",
        quote: "I can do all things through him who strengthens me.",
        author: "Philippians 4:13",
      },
      {
        id: 39,
        category: "Career Quote",
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        id: 40,
        category: "Development Quote",
        quote: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson",
      },
      {
        id: 41,
        category: "Technology Quote",
        quote: "The technology you use impresses no one. The experience you create with it is everything.",
        author: "Sean Gerety",
      },
      {
        id: 42,
        category: "Bible Quote",
        quote: "Delight yourself in the Lord, and he will give you the desires of your heart.",
        author: "Psalm 37:4",
      },
      {
        id: 43,
        category: "Career Quote",
        quote: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
        author: "Roy T. Bennett",
      },
      {
        id: 44,
        category: "Development Quote",
        quote: "The expert in anything was once a beginner.",
        author: "Helen Hayes",
      },
      {
        id: 45,
        category: "Technology Quote",
        quote: "Any sufficiently advanced technology is indistinguishable from magic.",
        author: "Arthur C. Clarke",
      },
      {
        id: 46,
        category: "Bible Quote",
        quote: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness, and self-control.",
        author: "Galatians 5:22-23",
      },
      {
        id: 47,
        category: "Development Quote",
        quote: "Do it unsure, do it tensed, do it tired, do it confused, feel the fear and do It anyway",
        author: "Susan Jeffers",
      },
      {
        id: 47,
        category: "Life Quote",
        quote: "Commit to the journey, persevere till the end, and savour the victory of finishing what you started",
        author: "Chat GPT",
      },

      {
        id: 48,
        category: "Career Quote",
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        id: 49,
        category: "Development Quote",
        quote: "First, solve the problem. Then, write the code.",
        author: "John Johnson",
      },
      {
        id: 50,
        category: "Technology Quote",
        quote: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
      },
      {
        id: 51,
        category: "Life Quote",
        quote: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.",
        author: "Ralph Waldo Emerson",
      },
      {
        id: 52,
        category: "Bible Quote",
        quote: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        author: "John 3:16",
      },
      {
        id: 53,
        category: "Career Quote",
        quote: "Choose a job you love, and you will never have to work a day in your life.",
        author: "Confucius",
      },
      {
        id: 54,
        category: "Development Quote",
        quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        author: "Martin Fowler",
      },
      {
        id: 55,
        category: "Technology Quote",
        quote: "It has become appallingly obvious that our technology has exceeded our humanity.",
        author: "Albert Einstein",
      },
      {
        id: 56,
        category: "Life Quote",
        quote: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius",
      },
      {
        id: 57,
        category: "Bible Quote",
        quote: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
        author: "1 Corinthians 13:4",
      },
      {
        id: 58,
        category: "Career Quote",
        quote: "The only place where success comes before work is in the dictionary.",
        author: "Vidal Sassoon",
      },
      {
        id: 59,
        category: "Development Quote",
        quote: "Programming isn't about what you know; it's about what you can figure out.",
        author: "Chris Pine",
      },
      {
        id: 60,
        category: "Technology Quote",
        quote: "The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.",
        author: "Bill Gates",
      },
      {
        id: 61,
        category: "Life Quote",
        quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
      },
      {
        id: 62,
        category: "Bible Quote",
        quote: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
        author: "Joshua 1:9",
      },
      {
        id: 63,
        category: "Career Quote",
        quote: "The future depends on what you do today.",
        author: "Mahatma Gandhi",
      },
      {
        id: 64,
        category: "Development Quote",
        quote: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
        author: "Dan Salomon",
      },
      {
        id: 65,
        category: "Technology Quote",
        quote: "The real danger is not that computers will begin to think like men, but that men will begin to think like computers.",
        author: "Sydney J. Harris",
      },
      {
        id: 66,
        category: "Life Quote",
        quote: "In the end, it's not the years in your life that count. It's the life in your years.",
        author: "Abraham Lincoln",
      },
      {
        id: 67,
        category: "Bible Quote",
        quote: "I can do all this through him who gives me strength.",
        author: "Philippians 4:13",
      },
      {
        id: 68,
        category: "Career Quote",
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        id: 69,
        category: "Development Quote",
        quote: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        author: "Brian W. Kernighan",
      },
      {
        id: 70,
        category: "Technology Quote",
        quote: "Technology is a word that describes something that doesn't work yet.",
        author: "Douglas Adams",
      },
      {
        id: 71,
        category: "Life Quote",
        quote: "Life is 10% what happens to you and 90% how you react to it.",
        author: "Charles R. Swindoll",
      },
      {
        id: 72,
        category: "Bible Quote",
        quote: "Trust in the Lord with all your heart and lean not on your own understanding.",
        author: "Proverbs 3:5",
      },
      {
        id: 73,
        category: "Career Quote",
        quote: "The difference between ordinary and extraordinary is that little extra.",
        author: "Jimmy Johnson",
      },
      {
        id: 74,
        category: "Development Quote",
        quote: "The best way to predict the future is to implement it.",
        author: "David Heinemeier Hansson",
      },
      {
        id: 75,
        category: "Technology Quote",
        quote: "The human spirit must prevail over technology.",
        author: "Albert Einstein",
      },
      {
        id: 76,
        category: "Life Quote",
        quote: "The two most important days in your life are the day you are born and the day you find out why.",
        author: "Mark Twain",
      },
      {
        id: 77,
        category: "Bible Quote",
        quote: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        author: "Romans 8:28",
      },
      {
        id: 78,
        category: "Career Quote",
        quote: "The only place where success comes before work is in the dictionary.",
        author: "Vidal Sassoon",
      },
      {
        id: 79,
        category: "Development Quote",
        quote: "Talk is cheap. Show me the code.",
        author: "Linus Torvalds",
      },
      {
        id: 80,
        category: "Technology Quote",
        quote: "It's not a faith in technology. It's faith in people.",
        author: "Steve Jobs",
      },
      {
        id: 81,
        category: "Life Quote",
        quote: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon",
      },
      {
        id: 82,
        category: "Bible Quote",
        quote: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
        author: "Jeremiah 29:11",
      },
      {
        id: 83,
        category: "Career Quote",
        quote: "Find out what you like doing best and get someone to pay you for doing it.",
        author: "Katherine Whitehorn",
      },
      {
        id: 84,
        category: "Development Quote",
        quote: "The most disastrous thing that you can ever learn is your first programming language.",
        author: "Alan Kay",
      },
      {
        id: 85,
        category: "Technology Quote",
        quote: "The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past.",
        author: "Tim Berners-Lee",
      },
      {
        id: 86,
        category: "Life Quote",
        quote: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.",
        author: "Ralph Waldo Emerson",
      },
      {
        id: 87,
        category: "Bible Quote",
        quote: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
        author: "Matthew 6:33",
      },
      {
        id: 88,
        category: "Career Quote",
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        id: 89,
        category: "Development Quote",
        quote: "Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.",
        author: "Rick Cook",
      },
      {
        id: 90,
        category: "Technology Quote",
        quote: "The science of today is the technology of tomorrow.",
        author: "Edward Teller",
      },
      {
        id: 91,
        category: "Life Quote",
        quote: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius",
      },
      {
        id: 92,
        category: "Bible Quote",
        quote: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.",
        author: "John 16:33",
      },
      {
        id: 93,
        category: "Career Quote",
        quote: "Choose a job you love, and you will never have to work a day in your life.",
        author: "Confucius",
      },
      {
        id: 94,
        category: "Development Quote",
        quote: "The best method for accelerating a computer is the one that boosts it by 9.8 m/s2.",
        author: "Anonymous",
      },
      {
        id: 95,
        category: "Technology Quote",
        quote: "Technology is anything that wasn't around when you were born.",
        author: "Alan Kay",
      },
      {
        id: 96,
        category: "Life Quote",
        quote: "Life isn't about finding yourself. Life is about creating yourself.",
        author: "George Bernard Shaw",
      },
      {
        id: 97,
        category: "Bible Quote",
        quote: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
        author: "Philippians 4:6",
      },
      {
        id: 98,
        category: "Career Quote",
        quote: "The future depends on what you do today.",
        author: "Mahatma Gandhi",
      },
      {
        id: 99,
        category: "Development Quote",
        quote: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
        author: "Bill Gates",
      },
      {
        id: 100,
        category: "Technology Quote",
        quote: "Any sufficiently advanced technology is equivalent to magic.",
        author: "Arthur C. Clarke",
      },
      {
        id: 101,
        category: "Life Quote",
        quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
      },
      {
        id: 102,
        category: "Bible Quote",
        quote: "The Lord is my shepherd, I lack nothing.",
        author: "Psalm 23:1",
      },
      {
        id: 103,
        category: "Career Quote",
        quote: "The only place where success comes before work is in the dictionary.",
        author: "Vidal Sassoon",
      },
      {
        id: 104,
        category: "Development Quote",
        quote: "First, solve the problem. Then, write the code.",
        author: "John Johnson",
      },
      {
        id: 105,
        category: "Technology Quote",
        quote: "Technology is best when it brings people together.",
        author: "Matt Mullenweg",
      },
      {
        id: 106,
        category: "Life Quote",
        quote: "Life is what happens to you while you're busy making other plans.",
        author: "Allen Saunders",
      },
      {
        id: 107,
        category: "Bible Quote",
        quote: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
        author: "Joshua 1:9",
      },
      {
        id: 108,
        category: "Career Quote",
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        id: 109,
        category: "Development Quote",
        quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        author: "Martin Fowler",
      },
      {
        id: 110,
        category: "Technology Quote",
        quote: "The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.",
        author: "Bill Gates",
      },
      {
        id: 111,
        category: "Life Quote",
        quote: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius",
      },
      {
        id: 112,
        category: "Bible Quote",
        quote: "I can do all this through him who gives me strength.",
        author: "Philippians 4:13",
      },
      {
        id: 113,
        category: "Career Quote",
        quote: "Choose a job you love, and you will never have to work a day in your life.",
        author: "Confucius",
      },
      {
        id: 114,
        category: "Development Quote",
        quote: "Programming isn't about what you know; it's about what you can figure out.",
        author: "Chris Pine",
      },
      {
        id: 115,
        category: "Technology Quote",
        quote: "It has become appallingly obvious that our technology has exceeded our humanity.",
        author: "Albert Einstein",
      },
      {
        id: 116,
        category: "Life Quote",
        quote: "The purpose of our lives is to be happy.",
        author: "Dalai Lama",
      },
      {
        id: 117,
        category: "Bible Quote",
        quote: "Trust in the Lord with all your heart and lean not on your own understanding.",
        author: "Proverbs 3:5",
      },
      {
        id: 118,
        category: "Career Quote",
        quote: "The future depends on what you do today.",
        author: "Mahatma Gandhi",
      },
      {
        id: 119,
        category: "Development Quote",
        quote: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
        author: "Dan Salomon",
      },
      {
        id: 120,
        category: "Technology Quote",
        quote: "The real danger is not that computers will begin to think like men, but that men will begin to think like computers.",
        author: "Sydney J. Harris",
      },
      {
        id: 121,
        category: "Life Quote",
        quote: "Life is 10% what happens to you and 90% how you react to it.",
        author: "Charles R. Swindoll",
      },
      {
        id: 122,
        category: "Bible Quote",
        quote: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        author: "John 3:16",
      },
      {
        id: 123,
        category: "Career Quote",
        quote: "The only place where success comes before work is in the dictionary.",
        author: "Vidal Sassoon",
      },
      {
        id: 124,
        category: "Development Quote",
        quote: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        author: "Brian W. Kernighan",
      },
      {
        id: 125,
        category: "Technology Quote",
        quote: "Technology is a word that describes something that doesn't work yet.",
        author: "Douglas Adams",
      },
      {
        id: 126,
        category: "Life Quote",
        quote: "The two most important days in your life are the day you are born and the day you find out why.",
        author: "Mark Twain",
      },
      {
        id: 127,
        category: "Bible Quote",
        quote: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        author: "Romans 8:28",
      },
      {
        id: 128,
        category: "Career Quote",
        quote: "Find out what you like doing best and get someone to pay you for doing it.",
        author: "Katherine Whitehorn",
      },
      {
        id: 129,
        category: "Development Quote",
        quote: "The most disastrous thing that you can ever learn is your first programming language.",
        author: "Alan Kay",
      },
      {
        id: 130,
        category: "Technology Quote",
        quote: "The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past.",
        author: "Tim Berners-Lee",
      },
      {
        id: 131,
        category: "Life Quote",
        quote: "Life isn't about finding yourself. Life is about creating yourself.",
        author: "George Bernard Shaw",
      },
      {
        id: 132,
        category: "Bible Quote",
        quote: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
        author: "Matthew 6:33",
      },
      {
        id: 133,
        category: "Career Quote",
        quote: "The difference between ordinary and extraordinary is that little extra.",
        author: "Jimmy Johnson",
      },
      {
        id: 134,
        category: "Development Quote",
        quote: "Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.",
        author: "Rick Cook",
      },
      {
        id: 135,
        category: "Technology Quote",
        quote: "The science of today is the technology of tomorrow.",
        author: "Edward Teller",
      },
      {
        id: 136,
        category: "Life Quote",
        quote: "In the end, it's not the years in your life that count. It's the life in your years.",
        author: "Abraham Lincoln",
      },
      {
        id: 137,
        category: "Bible Quote",
        quote: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.",
        author: "John 16:33",
      },
      {
        id: 138,
        category: "Career Quote",
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        id: 139,
        category: "Development Quote",
        quote: "The best method for accelerating a computer is the one that boosts it by 9.8 m/s2.",
        author: "Anonymous",
      },
      {
        id: 140,
        category: "Technology Quote",
        quote: "Technology is anything that wasn't around when you were born.",
        author: "Alan Kay",
      },
      {
        id: 141,
        category: "Life Quote",
        quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
      },
      {
        id: 142,
        category: "Bible Quote",
        quote: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
        author: "Philippians 4:6",
      },
      {
        id: 143,
        category: "Career Quote",
        quote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
        author: "Steve Jobs",
      },
      {
        id: 144,
        category: "Development Quote",
        quote: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
        author: "Bill Gates",
      },
      {
        id: 145,
        category: "Technology Quote",
        quote: "The human spirit must prevail over technology.",
        author: "Albert Einstein",
      },
      {
        id: 146,
        category: "Life Quote",
        quote: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon",
      },
      {
        id: 147,
        category: "Bible Quote",
        quote: "The Lord is my shepherd, I lack nothing.",
        author: "Psalm 23:1",
      },
      {
        id: 148,
        category: "Career Quote",
        quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
      },
      {
        id: 149,
        category: "Development Quote",
        quote: "It's not a bug – it's an undocumented feature.",
        author: "Anonymous",
      },
      {
        id: 150,
        category: "Technology Quote",
        quote: "Technology is a useful servant but a dangerous master.",
        author: "Christian Lous Lange",
      },
      {
        id: 151,
        category: "Life Quote",
        quote: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.",
        author: "Ralph Waldo Emerson",
      },
      {
        id: 152,
        category: "Bible Quote",
        quote: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
        author: "Jeremiah 29:11",
      },
      {
        id: 153,
        category: "Career Quote",
        quote: "The only place where success comes before work is in the dictionary.",
        author: "Vidal Sassoon",
      },
      {
        id: 154,
        category: "Development Quote",
        quote: "Good code is its own best documentation.",
        author: "Steve McConnell",
      },
      {
        id: 155,
        category: "Technology Quote",
        quote: "Any sufficiently advanced technology is indistinguishable from magic.",
        author: "Arthur C. Clarke",
      },
      {
        id: 156,
        category: "Life Quote",
        quote: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius",
      },
      {
        id: 157,
        category: "Bible Quote",
        quote: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
        author: "Joshua 1:9",
      },
      {
        id: 158,
        category: "Career Quote",
        quote: "Choose a job you love, and you will never have to work a day in your life.",
        author: "Confucius",
      },
      {
        id: 159,
        category: "Development Quote",
        quote: "The best way to predict the future is to implement it.",
        author: "David Heinemeier Hansson",
      },
      {
        id: 160,
        category: "Technology Quote",
        quote: "It's not that we use technology, we live technology.",
        author: "Godfrey Reggio",
      },
      {
        id: 161,
        category: "Life Quote",
        quote: "Life is 10% what happens to you and 90% how you react to it.",
        author: "Charles R. Swindoll",
      },
      {
        id: 162,
        category: "Bible Quote",
        quote: "Trust in the Lord with all your heart and lean not on your own understanding.",
        author: "Proverbs 3:5",
      },
      {
        id: 163,
        category: "Career Quote",
        quote: "The future depends on what you do today.",
        author: "Mahatma Gandhi",
      },
      {
        id: 164,
        category: "Development Quote",
        quote: "Programming isn't about what you know; it's about what you can figure out.",
        author: "Chris Pine",
      },
      {
        id: 165,
        category: "Technology Quote",
        quote: "The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.",
        author: "Bill Gates",
      },
      {
        id: 166,
        category: "Life Quote",
        quote: "The two most important days in your life are the day you are born and the day you find out why.",
        author: "Mark Twain",
      },
      {
        id: 167,
        category: "Bible Quote",
        quote: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        author: "Romans 8:28",
      },
      {
        id: 168,
        category: "Career Quote",
        quote: "Find out what you like doing best and get someone to pay you for doing it.",
        author: "Katherine Whitehorn",
      },
      {
        id: 169,
        category: "Development Quote",
        quote: "The most disastrous thing that you can ever learn is your first programming language.",
        author: "Alan Kay",
      },
      {
        id: 170,
        category: "Technology Quote",
        quote: "The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past.",
        author: "Tim Berners-Lee",
      },
      {
        id: 171,
        category: "Life Quote",
        quote: "Life isn't about finding yourself. Life is about creating yourself.",
        author: "George Bernard Shaw",
      },
      {
        id: 172,
        category: "Bible Quote",
        quote: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
        author: "Matthew 6:33",
      },
      {
        id: 173,
        category: "Career Quote",
        quote: "The difference between ordinary and extraordinary is that little extra.",
        author: "Jimmy Johnson",
      },
      {
        id: 174,
        category: "Development Quote",
        quote: "First, solve the problem. Then, write the code.",
        author: "John Johnson",
      },
      {
        id: 175,
        category: "Technology Quote",
        quote: "Technology is best when it brings people together.",
        author: "Matt Mullenweg",
      },
      {
        id: 176,
        category: "Life Quote",
        quote: "In the end, it's not the years in your life that count. It's the life in your years.",
        author: "Abraham Lincoln",
      },
      {
        id: 177,
        category: "Bible Quote",
        quote: "I can do all this through him who gives me strength.",
        author: "Philippians 4:13",
      },
      {
        id: 178,
        category: "Career Quote",
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        id: 179,
        category: "Development Quote",
        quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        author: "Martin Fowler",
      },
      {
        id: 180,
        category: "Technology Quote",
        quote: "It has become appallingly obvious that our technology has exceeded our humanity.",
        author: "Albert Einstein",
      },
      {
        id: 181,
        category: "Life Quote",
        quote: "The purpose of our lives is to be happy.",
        author: "Dalai Lama",
      },
      {
        id: 182,
        category: "Bible Quote",
        quote: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        author: "John 3:16",
      },
      {
        id: 183,
        category: "Career Quote",
        quote: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs",
      },
      {
        id: 184,
        category: "Development Quote",
        quote: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
        author: "Dan Salomon",
      },
      {
        id: 185,
        category: "Technology Quote",
        quote: "The real danger is not that computers will begin to think like men, but that men will begin to think like computers.",
        author: "Sydney J. Harris",
      },
      {
        id: 186,
        category: "Life Quote",
        quote: "Life is what happens to you while you're busy making other plans.",
        author: "Allen Saunders",
      },
      {
        id: 187,
        category: "Bible Quote",
        quote: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
        author: "Philippians 4:6",
      },
      {
        id: 188,
        category: "Career Quote",
        quote: "The only place where success comes before work is in the dictionary.",
        author: "Vidal Sassoon",
      },
      {
        id: 189,
        category: "Development Quote",
        quote: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        author: "Brian W. Kernighan",
      },
      {
        id: 190,
        category: "Technology Quote",
        quote: "Technology is a word that describes something that doesn't work yet.",
        author: "Douglas Adams",
      },
      {
        id: 191,
        category: "Life Quote",
        quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
      },
      {
        id: 192,
        category: "Bible Quote",
        quote: "The Lord is my shepherd, I lack nothing.",
        author: "Psalm 23:1",
      },
      {
        id: 193,
        category: "Career Quote",
        quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
      },
      {
        id: 194,
        category: "Development Quote",
        quote: "It's not a bug – it's an undocumented feature.",
        author: "Anonymous",
      },
      {
        id: 195,
        category: "Technology Quote",
        quote: "Technology is a useful servant but a dangerous master.",
        author: "Christian Lous Lange",
      },
      {
        id: 196,
        category: "Life Quote",
        quote: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius",
      },
      {
        id: 197,
        category: "Bible Quote",
        quote: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
        author: "Joshua 1:9",
      },
      {
        id: 198,
        category: "Career Quote",
        quote: "Choose a job you love, and you will never have to work a day in your life.",
        author: "Confucius",
      },
      {
        id: 199,
        category: "Development Quote",
        quote: "The best way to predict the future is to implement it.",
        author: "David Heinemeier Hansson",
      },
      {
        id: 200,
        category: "Technology Quote",
        quote: "It's not that we use technology, we live technology.",
        author: "Godfrey Reggio",
      },
  ];
  
  export default mixedQuotes;