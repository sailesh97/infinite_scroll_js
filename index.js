const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {
    console.log(entries);      // * For #Reference1
    // entries will always be an array. It's an array of everything that has changed its observation, essentially if it's intersecting or not within that period of time.

    entries.forEach(entry => {
        // toggle is a inbuilt method on DOMTokenList class - Refer to this https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle
        entry.target.classList.toggle("show", entry.isIntersecting)
    })
},{
  threshold: 1  
});

cards.forEach(card => {
    observer.observe(card);
})

/**
 * This callback we pass to IntersectionObserver will be called, every single time something you're observing changes its intersection. 
 * 
 * This callback take some options, that is used to, how you as a developer wants to configure it
 * 
 * This callback takes a list of entries. These entries are all the things that have changed. The things that have intersected or unintersected.
 * 
 * IntersectionObserver also takes a config object apart from callback in 2nd arg.
 * 
 * threshold is one such config whose value varies from 0 to 1.
 * 
 * threshold: We're setting threshold only to show our animation properly. By default threshold is 0 and with that threshold value, as soon as a single pexel of the element is visible (when we scroll, new elements loaded, when single pixel of new element is visible), it'll turn isIntersecting property for that entry to true. As soon as it's border entered to visible area of browser.
 * 
 * Based on isIntersecting we're adding and removing 'show' css class. So, by setting threshold to 1, we're adding the animation to new element and removing animation from top element when 100% of new element is in visible area of browser screen.
 * 
 * What "observer.observe(cards[0])" will do is; Observe when cards[0] changes its intersections
 * 
 */

/** 
     * 
     * For #Reference1
     * 
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