import React, { useState, useEffect } from 'react';
import { EventForm } from '../components/forms/EventForm';
import { MoodForm } from '../components/forms/MoodForm';
import { PositiveForm } from '../components/forms/PositiveForm';
import { CopyLink } from '../components/CopyLink';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toGetEvent, toGetPositives, toGetMoods } from '../selectors/useSelectors';
import { updateUser } from '../actions/authActions';
import { fetchPostPositive } from '../actions/positiveActions';
import style from '../components/Styles/NewUser.css';

export const useNewUser = () => {
  const { event: eventCreated } = useSelector(toGetEvent);
  const { loading: positiveCreated } = useSelector(toGetPositives);
  const { loading: moodCreated } = useSelector(toGetMoods);
  const [currentRender, setCurrentRender] = useState((<></>));
  const [index, setIndex] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  const friendCode = new URLSearchParams(location.search).get('friendcode');

  const slides = [
    { title: 'Hello!', conditionsMet: true },
    {
      title: 'Hello!',
      text: 'The goal of this app is to give you the tools to be in control of your mental health.',
    
      conditionsMet: true
    },
    {
      title: 'Hello!',
      text: 'You should be able to log on and find exactly what you need at that moment.',
    
      conditionsMet: true
    },
    {
      title: 'Hello!',
      text: 'Your kit is currently empty.',
      conditionsMet: true
    },
    {
      title: 'Hello!',
      text: 'Let’s start filling it!',
      conditionsMet: true
    },
    { title: 'Looking Forward', conditionsMet: true },
    {
      title: 'Looking Forward',
      text: 'Feelings won’t last forever, they come and go in waves.',
      conditionsMet: true
    },
    {
      title: 'Looking Forward',
      text: 'One way to remind yourself that this too shall pass is to give yourself something that you are looking forward to, that you can be excited about right now.',
      conditionsMet: true
    },
    {
      title: 'Looking Forward',
      text: 'What is one thing you are looking forward to?',
      component: (<EventForm key={0} />),
      conditionsMet: eventCreated
    },
    {
      title: 'Looking Forward',
      text: 'You can update this anytime, whether the event has happened or not.',
      conditionsMet: true
    },
    { title: 'Feelings', conditionsMet: true },
    {
      title: 'Feelings',
      text: 'Sometimes strong feelings come on and it’s hard to think clearly about what you might want to do in response.',
      conditionsMet: true
    },
    {
      title: 'Feelings',
      text: 'We can’t always get rid of the feeling, but we can find ways to sit with it or get through it.',
      conditionsMet: true
    },
    {
      title: 'Feelings',
      text: 'What is a feeling you\'ve struggled with, and what are some things you might do or have done in response?',
      component: (<MoodForm key={1} />),
      conditionsMet: !moodCreated
    },
    {
      title: 'Feelings',
      text: 'As you discover what works and what doesn’t, you can update your lists.',
      conditionsMet: true
    },
    {
      title: 'Feelings',
      text: 'And you can add as many “Feelings” as you like.',
      conditionsMet: true
    },
    { title: 'Positives', conditionsMet: true },
    {
      title: 'Positives',
      text: 'There are so many wonderful things about you!',
      conditionsMet: true
    },
    {
      title: 'Positives',
      text: 'Take a moment to send a message to your future self with something you like/admire/value about who you are.',
      conditionsMet: true
    },
    {
      title: 'Positives',
      text: 'What is something you like about your self?',
      component: <PositiveForm key={2} />,
      conditionsMet: !positiveCreated
    },
    {
      title: 'Positives',
      text: 'You can continue to add more and more positive messages to yourself.',
      conditionsMet: true
    },
    {
      title: 'Positives',
      text: 'Or you can send the link below to the people who lift you up, and they can send you a positive message. (They don’t need an account).',
      component: <CopyLink key={4} link={`https://mental-health-dev.netlify.com/positive?friendcode=${friendCode}`} />,
      conditionsMet: true
    },
    {
      title: 'Congrats!',
      text: 'You now have a mental health first aid kit!',
      conditionsMet: true
    }
  ];
  
  useEffect(() => {
    setCurrentRender(
      <main className={style.currentRender}>
        {(<></>) && <h2>{slides[index].title}</h2>}
        {(<></>) && <p>{slides[index].text}</p>}
        {(<></>) && slides[index].component}
        {(<></>) && <img src={slides[index].img} /> }
      </main>);
  }, [index]);

  const handleNext = () => {
    if(index === slides.length - 1) {
      dispatch(updateUser({ newUser: false }));
      dispatch(fetchPostPositive({ 
        message: 'You have invested time in your mental health.', 
        friendCode, 
        author: 'Mental Health First Aid Team' }));
    }
    if(index < slides.length - 1) setIndex(index + 1);
    else history.push('./profile');
  };
  const handleBack = () => {
    if(index > 0) setIndex(index - 1);
  };

  return { index, slides, currentRender, handleNext, handleBack };
};
