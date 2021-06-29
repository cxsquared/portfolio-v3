---
title: 'Global Game Jam 2019 Postmortem'
date: '2019-02-01'
tags: [ggj, global game jam, game jam, postmortem, unity, fmod, audio]
category: blog
description: A postmortem on my 2019 Global Gam Jam game including some insight on using FMOD with unity.
image: title.png
comments: true
---

Another year and another exciting [Global Game Jam][globalgamejam]. This one being one of my favorite jams in a long while. For those who don't know Global Game Jam (GGJ) is an annual global event where participants create a game in 48 hours. Typically this is done at a designated site with a team that is built at the event.

This was my most successful game jam in a while. The team worked together really well. We had a game that was playable from start to finish. And we had the time to add extra polish to our game that I typically don't get to do in a Jam. The only thing that went wrong is our WebGL build ended up not working. I was so tired by the end of the jam that there was no chance I had the brain power to debug it before the end of the jam.

![Kessler Kick](https://ggj.s3.amazonaws.com/styles/game_sidebar__wide/featured_image/2019/01/81863/image1_1.png?itok=LSUViUnA&timestamp=1548617314)

So let's get into the postmortem and see what I felt went right and what went wrong.

## Ideas and Teams

This year's theme was "What does home mean to you". I, for one, love this theme greatly. It's the perfect open ended question that is easy enough to quickly come up with ideas that will be uniquely different to you.

Initially I came up with ideas around coziness, warmth, solidarity, and companionship. I really liked my ideas but it didn't seem anyone else was into it. Since my goal for global game jam is always meet and work with new people I joined a team with the idea that interested me the most.

The team I joined settled on a music based game about protecting your home planet. The fit for the theme was a little lacking but I loved the idea of incorporating music into it. If you've read any of the other content on my site you'll know I'm a big fan of audio programming so this was right up my alley. Even better our team had two other programmers and a music composer so I could concentrate solely on music/sound implementation for the game.

## The Good

For me, this was my most successful jam in quite a while. I think this really came down to a good team, a simple idea, and a decent background in what we were doing.

My team ended up being other members of the [Indianapolis Game Dev][indygamedev] group that a had met before. We lacked in art but had plenty of experience in programming and sound to fully realize the idea we had. This was probably the first time I didn't have any problems with [Git][git] and everyone on the team knew how to use it before hand. For any aspiring programmers out there please learn [Git][learngit]. You'll make your life easier and it's so much easier to work in a team with it.

Our idea was a simple action defense game. Meteors would rain down on your planet as you flew around in your ship trying to deflect them. Our extra twist to the game was that deflecting the meteors would trigger music cues. We wanted the gameplay to influence the music and the music to influence the gameplay.

We ended up having our melody generated from meteor deflections and the meteors moving in time with the music. That was all made possible by using the [FMOD][fmod] middleware which gave us a lot of flexibility to control the sounds. I spent the majority of my time writing up a [Sound Manager][soundmanager] to control the audio and give callbacks based on audio keys like beats and bars.

I have a background in FMOD already so it was an easy choice to use it. My previous knowledge let me build out most of the audio code in the first day which gave us time to squash bugs and add polish to the game. But even with that extra time I still wasn't 100% happy with how the audio turned out.

## The Bad

While I was supper happy about how the game turned out not everything went to plan. My biggest let down was we couldn't get the WebGL build of our game working. It built fine but none of the menu clicks were responding. I'll probably go back and try to figure this one out but for now the desktop version is all we have.

The other problem was the audio mix. Our composer on the team made some great music and sound effects for us to use in the game but because of time I didn't get them all implemented how I wanted. The game still sounds good but I would have liked to get some of the audio levels a bit more dialed in to make more of an impact during our major points in the game.

---

![Kessler Kick Screenshot](https://ggj.s3.amazonaws.com/styles/feature_image__wide/games/screenshots/gameplay_181.png?itok=uCjKXA9j&timestamp=1548620046)

Overall I was really happy with how the game turned out. The team was great, I actually got sleep, and we had a complete game.

Check out the game at [gameJolt.com/games/kessler_kick/393598][kesslerkick]. You can take a peak at the unity file over on [Github][kesslerkicksource].

Till next time,

\~ Cody \~

[globalgamejam]: https://globalgamejam.org/ 'Global Game Jam'
[fmod]: https://www.fmod.com/ 'FMOD Website'
[unity]: https://unity3d.com/ 'Unity3D'
[soundmanager]: https://github.com/Chopknee/KesslerKick/blob/master/Assets/Scripts/SoundManager.cs 'SoundManager.cs Class'
[kesslerkick]: https://gamejolt.com/games/kessler_kick/393598
[kesslerkicksource]: https://github.com/Chopknee/KesslerKick/
[learngit]: https://try.github.io/
[git]: https://git-scm.com/
[indygamedev]: https://www.meetup.com/GameDevIN/
