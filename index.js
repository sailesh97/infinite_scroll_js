const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {
    console.log(entries);
    // entries will always be an array. It's an array of everything that has changed its observation, essentially if it's intersecting or not within that period of time.

    /** 
        [{
            boundingClientRect : DOMRectReadOnly {x: 8, y: 8, width: 145.09375, height: 36.5, top: 8, …}
            intersectionRatio : 1
            intersectionRect : DOMRectReadOnly {x: 8, y: 8, width: 145.09375, height: 36.5, top: 8, …}
            isIntersecting : true
            isVisible : false
            rootBounds : DOMRectReadOnly {x: 0, y: 0, width: 1107, height: 553, top: 0, …}
            target : div.card.show
            time : 51592.60000000149
        }]

        As we re observing one cards[0], first element inside card container, we get only element in entries array.

        * intersectionRatio: What percentage of the object is on the screen. In our case one card element is big enough to fit in the screen. Hence 100% of card element is on screen, hence 1.

        * isIntersecting: true - Is it visible on screen

        * boundingClientRect -  Shape of the actual element

        * intersectionRect - Amount of space that is visible on screen of the thing that we're actually targetting. As our card element is 100% visible, intersectionRect is same as boundingClientRect. If 50% visible, the values will be boundingClientRect/2

        * target - It is the actual dom node we're targetting to.
     */
    
    /** ----------------------------------------------------------------------------------- */
    
    /**
     * Our logic will be, if isIntersecting is true, we'll add "show" css class and if it is false, we'll remove the show class.
     */

});

observer.observe(cards[0]);

/**
 * This callback we pass to IntersectionObserver will be called, every single time something you're observing changes its intersection. 
 * 
 * This callback take some options, that is used to, how you as a developer wants to configure it
 * 
 * This callback takes a list of entries. These entries are all the things that have changed. The things that have intersected or unintersected.
 * 
 * What "observer.observe(cards[0])" will do is; Observe when cards[0] changes its intersections
 * 
 */