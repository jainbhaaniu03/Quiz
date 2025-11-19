// Quiz State
let currentQuestion = 0;
let answers = {};
let selectedQuestions = [];
let showResults = false;

// All 100 Questions
const allQuestions = [
  { id: 'introvert', q: "On a Friday night, what sounds most appealing?", options: [{ text: "Cozy night in with movies and snacks", value: 5 }, { text: "Small gathering with close friends", value: 3 }, { text: "Big party or social event", value: 1 }]},
  { id: 'spontaneity', q: "How do you feel about spontaneous adventures?", options: [{ text: "Love them! The more spontaneous the better", value: 5 }, { text: "Fun occasionally, but I like some planning", value: 3 }, { text: "Prefer to plan things out in advance", value: 1 }]},
  { id: 'humor', q: "What kind of humor makes you laugh most?", options: [{ text: "Witty banter and clever wordplay", value: 5 }, { text: "Silly and goofy jokes", value: 3 }, { text: "Sarcasm and dry humor", value: 4 }]},
  { id: 'communication', q: "When something's bothering you, you usually:", options: [{ text: "Talk about it right away", value: 5 }, { text: "Need some time to process first", value: 3 }, { text: "Try to work it out on my own", value: 1 }]},
  { id: 'affection', q: "How do you prefer to show affection?", options: [{ text: "Physical touch (hugs, cuddling, etc.)", value: 5 }, { text: "Words of affirmation and compliments", value: 4 }, { text: "Acts of service and doing things for them", value: 3 }]},
  { id: 'interests', q: "Your ideal way to spend quality time together:", options: [{ text: "Trying new activities or hobbies together", value: 5 }, { text: "Deep conversations over coffee or dinner", value: 4 }, { text: "Just being in the same room, doing our own things", value: 2 }]},
  { id: 'conflict', q: "During a disagreement, you tend to:", options: [{ text: "Address it directly and talk it through", value: 5 }, { text: "Take a break and come back to it later", value: 3 }, { text: "Try to lighten the mood first", value: 4 }]},
  { id: 'support', q: "When your partner is stressed, you're most likely to:", options: [{ text: "Listen and offer emotional support", value: 5 }, { text: "Try to help solve the problem", value: 4 }, { text: "Give them space and check in later", value: 2 }]},
  { id: 'morning', q: "You're naturally more of a:", options: [{ text: "Morning person - up with the sun!", value: 5 }, { text: "It depends on the day", value: 3 }, { text: "Night owl - alive after dark", value: 1 }]},
  { id: 'decisions', q: "When making big decisions, you:", options: [{ text: "Go with your gut feeling", value: 5 }, { text: "Make a pros and cons list", value: 3 }, { text: "Ask for others' opinions", value: 4 }]},
  { id: 'music', q: "Your music taste is:", options: [{ text: "All over the place - I love variety", value: 5 }, { text: "Specific genres I'm passionate about", value: 3 }, { text: "Whatever's popular/trending", value: 1 }]},
  { id: 'texting', q: "Your texting style is:", options: [{ text: "Quick responses, lots of emojis", value: 5 }, { text: "Thoughtful replies when I have time", value: 3 }, { text: "Voice notes or calling instead", value: 4 }]},
  { id: 'food', q: "When it comes to food:", options: [{ text: "I love trying new cuisines", value: 5 }, { text: "I have my favorites I stick to", value: 3 }, { text: "I'm adventurous with familiar foods", value: 4 }]},
  { id: 'cleanliness', q: "Your living space is usually:", options: [{ text: "Super organized and tidy", value: 5 }, { text: "Organized chaos - I know where things are", value: 3 }, { text: "Clean when company's coming", value: 1 }]},
  { id: 'pets', q: "Your feelings about pets:", options: [{ text: "Love them! The more the merrier", value: 5 }, { text: "Like them but not ready for one", value: 3 }, { text: "Prefer not to have pets", value: 1 }]},
  { id: 'exercise', q: "Your approach to staying active:", options: [{ text: "Regular gym/workout routine", value: 5 }, { text: "Casual walks or occasional activity", value: 3 }, { text: "Active when motivation strikes", value: 1 }]},
  { id: 'travel', q: "Dream vacation involves:", options: [{ text: "Beach relaxation and cocktails", value: 5 }, { text: "City exploration and culture", value: 4 }, { text: "Adventure and outdoor activities", value: 3 }]},
  { id: 'arguments', q: "After an argument, you need:", options: [{ text: "Time alone to cool down", value: 3 }, { text: "To resolve it immediately", value: 5 }, { text: "A hug and reassurance", value: 4 }]},
  { id: 'compliments', q: "You feel most appreciated when someone:", options: [{ text: "Tells you how much you mean to them", value: 5 }, { text: "Does something thoughtful for you", value: 4 }, { text: "Spends quality time with you", value: 3 }]},
  { id: 'movies', q: "For movie night, you'd pick:", options: [{ text: "Comedy - need to laugh", value: 5 }, { text: "Drama or thriller - something intense", value: 3 }, { text: "Rom-com or feel-good movie", value: 4 }]},
  { id: 'social_media', q: "Your social media presence is:", options: [{ text: "Active - I post regularly", value: 5 }, { text: "Lurker - I scroll but rarely post", value: 3 }, { text: "Minimal - barely use it", value: 1 }]},
  { id: 'shopping', q: "When shopping, you:", options: [{ text: "Know what I want and get it", value: 5 }, { text: "Browse and see what catches my eye", value: 3 }, { text: "Research everything before buying", value: 4 }]},
  { id: 'surprises', q: "How do you feel about surprises?", options: [{ text: "Love them! Keep me guessing", value: 5 }, { text: "Okay with small surprises", value: 3 }, { text: "Prefer to know what's happening", value: 1 }]},
  { id: 'hobbies', q: "Your hobbies tend to be:", options: [{ text: "Creative (art, music, writing)", value: 5 }, { text: "Active (sports, hiking, dancing)", value: 4 }, { text: "Chill (reading, gaming, TV)", value: 3 }]},
  { id: 'punctuality', q: "When meeting someone, you're usually:", options: [{ text: "Early - hate being late", value: 5 }, { text: "Right on time", value: 3 }, { text: "Fashionably late", value: 1 }]},
  { id: 'weather', q: "Your ideal weather is:", options: [{ text: "Sunny and warm", value: 5 }, { text: "Cool and breezy", value: 3 }, { text: "Cozy and rainy", value: 4 }]},
  { id: 'risk', q: "When it comes to taking risks:", options: [{ text: "I'm pretty cautious", value: 1 }, { text: "I take calculated risks", value: 3 }, { text: "Life's an adventure!", value: 5 }]},
  { id: 'cooking', q: "In the kitchen, you're:", options: [{ text: "A confident cook who experiments", value: 5 }, { text: "Can follow a recipe well", value: 3 }, { text: "More of a takeout person", value: 1 }]},
  { id: 'gifts', q: "The best gift is:", options: [{ text: "Something thoughtful and personal", value: 5 }, { text: "An experience we can share", value: 4 }, { text: "Something practical I'll use", value: 3 }]},
  { id: 'photos', q: "Taking photos together, you're:", options: [{ text: "Yes! Let's capture everything", value: 5 }, { text: "A few good ones are enough", value: 3 }, { text: "Rather just enjoy the moment", value: 1 }]},
  { id: 'learning', q: "You prefer to learn by:", options: [{ text: "Doing it hands-on", value: 5 }, { text: "Reading or watching tutorials", value: 3 }, { text: "Having someone teach me", value: 4 }]},
  { id: 'phone', q: "Your phone usage is:", options: [{ text: "Constantly checking it", value: 5 }, { text: "Check it periodically", value: 3 }, { text: "Often forget where it is", value: 1 }]},
  { id: 'organization', q: "Planning a trip, you:", options: [{ text: "Have a detailed itinerary", value: 5 }, { text: "Know the highlights, wing the rest", value: 3 }, { text: "Figure it out as we go", value: 1 }]},
  { id: 'energy', q: "Your energy level is usually:", options: [{ text: "High - always ready to go", value: 5 }, { text: "Steady throughout the day", value: 3 }, { text: "Comes in bursts", value: 4 }]},
  { id: 'stress', q: "When stressed, you cope by:", options: [{ text: "Talking it out with someone", value: 5 }, { text: "Keeping busy with activities", value: 4 }, { text: "Needing alone time", value: 3 }]},
  { id: 'birthday', q: "Your ideal birthday celebration:", options: [{ text: "Big party with everyone", value: 5 }, { text: "Intimate dinner with close ones", value: 3 }, { text: "Low-key day doing what I love", value: 4 }]},
  { id: 'books', q: "Your reading preference:", options: [{ text: "Fiction - escape into stories", value: 5 }, { text: "Non-fiction - learn something new", value: 3 }, { text: "Mix of both", value: 4 }]},
  { id: 'apology', q: "When you mess up, you:", options: [{ text: "Apologize immediately", value: 5 }, { text: "Need time to think about it first", value: 3 }, { text: "Show it through actions", value: 4 }]},
  { id: 'future', q: "Thinking about the future makes you feel:", options: [{ text: "Excited about possibilities", value: 5 }, { text: "A bit anxious", value: 3 }, { text: "Prefer to live in the present", value: 1 }]},
  { id: 'productivity', q: "You're most productive:", options: [{ text: "Early morning", value: 5 }, { text: "Afternoon", value: 3 }, { text: "Late at night", value: 1 }]},
  { id: 'change', q: "When plans change last minute:", options: [{ text: "No problem, I adapt easily", value: 5 }, { text: "A little annoying but okay", value: 3 }, { text: "Really throws me off", value: 1 }]},
  { id: 'comfort', q: "Your comfort zone is:", options: [{ text: "Something I regularly step out of", value: 5 }, { text: "Nice, but I'll leave occasionally", value: 3 }, { text: "Where I'm happiest", value: 1 }]},
  { id: 'fashion', q: "Your fashion sense is:", options: [{ text: "Trendy and current", value: 5 }, { text: "Classic and timeless", value: 3 }, { text: "Comfortable above all", value: 4 }]},
  { id: 'competition', q: "In competitive situations:", options: [{ text: "I'm very competitive", value: 5 }, { text: "It's fun but not serious", value: 3 }, { text: "Just here for a good time", value: 1 }]},
  { id: 'nostalgia', q: "Looking at old photos/memories:", options: [{ text: "Makes me happy and sentimental", value: 5 }, { text: "Is nice occasionally", value: 3 }, { text: "I'm focused on making new ones", value: 1 }]},
  { id: 'caffeine', q: "Your relationship with coffee/tea:", options: [{ text: "Need it to function", value: 5 }, { text: "Enjoy it but not dependent", value: 3 }, { text: "Rarely drink it", value: 1 }]},
  { id: 'multitask', q: "When it comes to multitasking:", options: [{ text: "I juggle multiple things well", value: 5 }, { text: "Prefer focusing on one thing", value: 3 }, { text: "Get distracted easily", value: 1 }]},
  { id: 'holidays', q: "During holidays, you prefer:", options: [{ text: "Big family gatherings", value: 5 }, { text: "Small intimate celebrations", value: 3 }, { text: "Quiet, low-key time", value: 1 }]},
  { id: 'advice', q: "When someone asks for advice:", options: [{ text: "I love helping and giving guidance", value: 5 }, { text: "I'll try my best to help", value: 3 }, { text: "I mostly just listen", value: 4 }]},
  { id: 'patience', q: "Your patience level is:", options: [{ text: "Very patient", value: 5 }, { text: "Depends on the situation", value: 3 }, { text: "I get frustrated easily", value: 1 }]},
  { id: 'emotions', q: "You express emotions:", options: [{ text: "Openly and freely", value: 5 }, { text: "With people I trust", value: 3 }, { text: "Keep them mostly private", value: 1 }]},
  { id: 'routine', q: "Having a daily routine:", options: [{ text: "Essential for me", value: 5 }, { text: "Nice to have structure", value: 3 }, { text: "Feels too restrictive", value: 1 }]},
  { id: 'criticism', q: "When receiving criticism:", options: [{ text: "I appreciate the feedback", value: 5 }, { text: "Depends how it's delivered", value: 3 }, { text: "It's hard not to take personally", value: 1 }]},
  { id: 'parties', q: "At a party, you're usually:", options: [{ text: "The life of the party", value: 5 }, { text: "Having good convos with a few people", value: 3 }, { text: "Hanging with the host's pet", value: 1 }]},
  { id: 'mistakes', q: "When you make a mistake:", options: [{ text: "Learn from it and move on", value: 5 }, { text: "Dwell on it for a bit", value: 3 }, { text: "Really hard on myself", value: 1 }]},
  { id: 'games', q: "Playing board/video games:", options: [{ text: "Love them, play often", value: 5 }, { text: "Fun occasionally", value: 3 }, { text: "Not really my thing", value: 1 }]},
  { id: 'sleep', q: "Your sleep schedule is:", options: [{ text: "Very consistent", value: 5 }, { text: "Somewhat regular", value: 3 }, { text: "All over the place", value: 1 }]},
  { id: 'plants', q: "With plants/gardening:", options: [{ text: "I have a green thumb", value: 5 }, { text: "I try but they sometimes die", value: 3 }, { text: "I kill every plant I touch", value: 1 }]},
  { id: 'savings', q: "With money, you tend to:", options: [{ text: "Save most, spend carefully", value: 5 }, { text: "Balance saving and spending", value: 3 }, { text: "Live in the moment, spend freely", value: 1 }]},
  { id: 'crowds', q: "In crowded spaces:", options: [{ text: "Totally fine, energizing even", value: 5 }, { text: "Okay for a while", value: 3 }, { text: "Makes me anxious", value: 1 }]},
  { id: 'decor', q: "Your room/space decor is:", options: [{ text: "Carefully curated aesthetic", value: 5 }, { text: "Cozy with personal touches", value: 3 }, { text: "Pretty minimal", value: 1 }]},
  { id: 'sharing', q: "Sharing food off your plate:", options: [{ text: "Of course! What's mine is yours", value: 5 }, { text: "Sure, but ask first", value: 3 }, { text: "I prefer keeping my food", value: 1 }]},
  { id: 'music_live', q: "At concerts/live music:", options: [{ text: "Front row, fully immersed", value: 5 }, { text: "Enjoy from a good spot", value: 3 }, { text: "Prefer recorded music", value: 1 }]},
  { id: 'deep_talk', q: "Deep, philosophical conversations:", options: [{ text: "Love them, could talk for hours", value: 5 }, { text: "Interesting occasionally", value: 3 }, { text: "Prefer lighter topics", value: 1 }]},
  { id: 'goals', q: "You set goals that are:", options: [{ text: "Ambitious and challenging", value: 5 }, { text: "Realistic and achievable", value: 3 }, { text: "Flexible and loose", value: 1 }]},
  { id: 'forgive', q: "You forgive others:", options: [{ text: "Easily and quickly", value: 5 }, { text: "Takes time but I get there", value: 3 }, { text: "Depends on what they did", value: 4 }]},
  { id: 'dancing', q: "When it comes to dancing:", options: [{ text: "Love it! Dance whenever", value: 5 }, { text: "Need the right mood/setting", value: 3 }, { text: "Not my strong suit", value: 1 }]},
  { id: 'new_people', q: "Meeting new people:", options: [{ text: "Exciting! Love making connections", value: 5 }, { text: "Fine but takes energy", value: 3 }, { text: "Prefer my established circle", value: 1 }]},
  { id: 'mornings', q: "Your morning routine is:", options: [{ text: "Elaborate and essential", value: 5 }, { text: "Quick and efficient", value: 3 }, { text: "What routine?", value: 1 }]},
  { id: 'volunteer', q: "Helping others/volunteering:", options: [{ text: "Very important to me", value: 5 }, { text: "Do it when I can", value: 3 }, { text: "Haven't found the right fit", value: 1 }]},
  { id: 'spicy', q: "With spicy food:", options: [{ text: "The spicier the better!", value: 5 }, { text: "Mild to medium", value: 3 }, { text: "Prefer no spice", value: 1 }]},
  { id: 'art', q: "Visiting museums/galleries:", options: [{ text: "Could spend all day there", value: 5 }, { text: "Nice for an hour or two", value: 3 }, { text: "Not really my scene", value: 1 }]},
  { id: 'tech', q: "With new technology:", options: [{ text: "Early adopter, love new gadgets", value: 5 }, { text: "Get it when needed", value: 3 }, { text: "Stick with what I know", value: 1 }]},
  { id: 'scary', q: "Horror movies/scary stuff:", options: [{ text: "Love the thrill!", value: 5 }, { text: "Okay with friends", value: 3 }, { text: "No thanks, too scary", value: 1 }]},
  { id: 'jokes', q: "When someone tells a bad joke:", options: [{ text: "Laugh anyway, it's cute", value: 5 }, { text: "Polite chuckle", value: 3 }, { text: "Can't fake it", value: 1 }]},
  { id: 'collaboration', q: "Working with others:", options: [{ text: "Prefer teamwork", value: 5 }, { text: "Depends on the task", value: 3 }, { text: "Like working solo", value: 1 }]},
  { id: 'nature', q: "Spending time in nature:", options: [{ text: "Essential for my wellbeing", value: 5 }, { text: "Nice when I do it", value: 3 }, { text: "I'm more of a city person", value: 1 }]},
  { id: 'plans', q: "Making plans in advance:", options: [{ text: "Plan everything weeks ahead", value: 5 }, { text: "A few days notice is good", value: 3 }, { text: "Spontaneous is fine", value: 1 }]},
  { id: 'rain', q: "Rainy days are:", options: [{ text: "Perfect cozy day in", value: 5 }, { text: "Fine, just different", value: 3 }, { text: "Ugh, ruins plans", value: 1 }]},
  { id: 'loyalty', q: "In relationships, loyalty means:", options: [{ text: "Everything - it's non-negotiable", value: 5 }, { text: "Very important foundation", value: 4 }, { text: "Important among other things", value: 3 }]},
  { id: 'silly', q: "Being silly and goofy:", options: [{ text: "All the time, it's who I am", value: 5 }, { text: "With the right people", value: 3 }, { text: "Rarely, I'm more serious", value: 1 }]},
  { id: 'diy', q: "DIY projects:", options: [{ text: "Love creating and building things", value: 5 }, { text: "Willing to try", value: 3 }, { text: "I'll hire someone", value: 1 }]},
  { id: 'zodiac', q: "Astrology and zodiac signs:", options: [{ text: "Totally believe in it", value: 5 }, { text: "Fun but don't take seriously", value: 3 }, { text: "Don't believe in it", value: 1 }]},
  { id: 'karaoke', q: "Karaoke night:", options: [{ text: "First one up there!", value: 5 }, { text: "After some encouragement", value: 3 }, { text: "I'll cheer from the audience", value: 1 }]},
  { id: 'breakfast', q: "Breakfast is:", options: [{ text: "The most important meal", value: 5 }, { text: "Nice when I have time", value: 3 }, { text: "Coffee counts, right?", value: 1 }]},
  { id: 'trust', q: "Your trust is:", options: [{ text: "Given until broken", value: 5 }, { text: "Earned over time", value: 3 }, { text: "Hard to gain", value: 1 }]},
  { id: 'jokes_on_me', q: "When jokes are at your expense:", options: [{ text: "I can laugh at myself", value: 5 }, { text: "Depends on the joke", value: 3 }, { text: "Not a fan", value: 1 }]},
  { id: 'gratitude', q: "Expressing gratitude:", options: [{ text: "Do it often and openly", value: 5 }, { text: "Show it in actions", value: 3 }, { text: "Assume people know", value: 1 }]},
  { id: 'debate', q: "Friendly debates are:", options: [{ text: "Stimulating and fun", value: 5 }, { text: "Okay if kept light", value: 3 }, { text: "Uncomfortable", value: 1 }]},
  { id: 'traditions', q: "Family traditions are:", options: [{ text: "Sacred, must continue them", value: 5 }, { text: "Nice but can be flexible", value: 3 }, { text: "Make our own new ones", value: 1 }]},
  { id: 'authenticity', q: "Being your authentic self:", options: [{ text: "Always, with everyone", value: 5 }, { text: "With those close to me", value: 3 }, { text: "Still figuring it out", value: 1 }]},
  { id: 'language', q: "Learning new languages:", options: [{ text: "Love it! Working on several", value: 5 }, { text: "Interested but hard to commit", value: 3 }, { text: "One is enough for me", value: 1 }]},
  { id: 'documentary', q: "Documentary preferences:", options: [{ text: "Love them, so informative", value: 5 }, { text: "Good sometimes", value: 3 }, { text: "Too slow for me", value: 1 }]},
  { id: 'handwritten', q: "Handwritten notes/letters:", options: [{ text: "So meaningful and special", value: 5 }, { text: "Sweet gesture", value: 3 }, { text: "Text works fine", value: 1 }]},
  { id: 'road_trip', q: "Road trips are:", options: [{ text: "The best kind of adventure", value: 5 }, { text: "Fun with the right people", value: 3 }, { text: "Rather fly there", value: 1 }]},
  { id: 'independence', q: "Your independence is:", options: [{ text: "Very important to maintain", value: 5 }, { text: "Balance with togetherness", value: 3 }, { text: "Like being interdependent", value: 4 }]},
  { id: 'finishing', q: "Starting vs finishing projects:", options: [{ text: "Always finish what I start", value: 5 }, { text: "Finish most things", value: 3 }, { text: "Better at starting", value: 1 }]}
];

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function initQuiz() {
  selectedQuestions = shuffleArray(allQuestions).slice(0, 10);
  currentQuestion = 0;
  answers = {};
  showResults = false;
  render();
}

function handleAnswer(value) {
  answers[selectedQuestions[currentQuestion].id] = value;
  
  if (currentQuestion < selectedQuestions.length - 1) {
    currentQuestion++;
    render();
  } else {
    showResults = true;
    render();
  }
}

function calculateMatch() {
  const traits = {
    introvert: answers.introvert >= 3,
    spontaneous: answers.spontaneity >= 3,
    communicative: answers.communication >= 4,
    affectionate: answers.affection >= 4
  };
  return traits;
}

function getMatchAnalysis() {
  const traits = calculateMatch();
  const analyses = [];

  if (traits.introvert) {
    analyses.push({
      trait: "Cozy Homebody Energy",
      match: "Perfect match! I love quiet nights in too. We can create our own little world together with movie marathons, cooking experiments, and deep conversations without needing the whole world around us."
    });
  } else {
    analyses.push({
      trait: "Social Butterfly Spirit",
      match: "Great balance! Your social energy complements my vibe perfectly. You'll bring me out of my shell and introduce me to new experiences, while I'll be your peaceful home base."
    });
  }

  if (traits.spontaneous) {
    analyses.push({
      trait: "Adventurous Soul",
      match: "Love this! Your spontaneity will keep life exciting. I'll plan the framework and you'll add the surprise elements - we'll have the best of both worlds."
    });
  } else {
    analyses.push({
      trait: "Thoughtful Planner",
      match: "We're so aligned! I appreciate someone who thinks ahead. Together we can plan amazing experiences and actually follow through on all those 'we should do this someday' ideas."
    });
  }

  if (traits.communicative) {
    analyses.push({
      trait: "Open Communicator",
      match: "This is huge! I value honest communication so much. We'll be able to talk through anything, grow together, and never let things fester. No games, just real connection."
    });
  }

  if (traits.affectionate) {
    analyses.push({
      trait: "Warm & Affectionate",
      match: "My favorite quality! I'm all about those little moments of affection - holding hands, random hugs, cuddles on the couch. We'll never run out of ways to show each other we care."
    });
  }

  return analyses;
}

function render() {
  const root = document.getElementById('root');
  
  if (showResults) {
    const matchAnalysis = getMatchAnalysis();
    root.innerHTML = `
      <div class="quiz-container results-container">
        <div class="results-header">
          <svg class="heart-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <h2 class="results-title">Your Perfect Match Profile!</h2>
          <p class="results-subtitle">Here's why we're meant to be together...</p>
        </div>
        
        <div class="analysis-container">
          ${matchAnalysis.map(item => `
            <div class="analysis-card">
              <div class="analysis-content">
                <svg class="sparkle-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
                <div>
                  <h3 class="trait-title">${item.trait}</h3>
                  <p class="trait-description">${item.match}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="compatibility-banner">
          <svg class="check-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01" fill="none" stroke="white" stroke-width="2"/>
          </svg>
          <h3 class="compatibility-title">100% Compatible! 💕</h3>
          <p class="compatibility-text">Every answer shows how perfectly you fit into my life. You bring out the best in me, and I can't wait to continue building our story together.</p>
        </div>
        
        <button class="restart-button" onclick="initQuiz()">Take Quiz Again</button>
      </div>
    `;
  } else {
    const question = selectedQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuestions.length) * 100;
    
    root.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <div class="header-top">
            <svg class="heart-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span class="question-counter">Question ${currentQuestion + 1} of ${selectedQuestions.length}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        
        <h2 class="question-text">${question.q}</h2>
        
        <div class="options-container">
          ${question.options.map((option, idx) => `
            <button class="option-button" onclick="handleAnswer(${option.value})">
              ${option.text}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// Make functions globally accessible
window.handleAnswer = handleAnswer;
window.initQuiz = initQuiz;

// Initialize on page load
initQuiz();
