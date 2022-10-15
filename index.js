const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {
    console.log(entries);      // * For #Reference1
    // entries will always be an array. It's an array of everything that has changed its observation, essentially if it's intersecting or not within that period of time.

    entries.forEach(entry => {
        // toggle is a inbuilt method on DOMTokenList class - Refer to this https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle
        entry.target.classList.toggle("show", entry.isIntersecting)
        if(entry.isIntersecting) observer.unobserve(entry.target);
    })
},{
    threshold:1
    // rootMargin: '100px'  
    // root: 
    // root property identifies the Element or Document whose bounds are treated as the bounding box of the viewport for the element which is the observer's target.
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

    /**
     *  if(entry.isIntersecting) observer.unobserve(entry.target);
     *  
     *  Before adding this line, we are toggling the show class again to off which changes is opacity to 0 as we scroll down the top elements are going out of the visible area.
     * 
     * But in real-life scenarios like in Facebook posts, top elements are never deleted or removed from browser. User can scroll down and again scroll up to see the posts again he has already seen.
     * 
     * So to implement similar effect, we are unobserving the elements once their isIntersecting is true.
     */

    /**
     *  Like threshold, another important property is rootMargin, whose value can be in pixels, whether in +ve or -ve doesn't matter.
     *  this allows us to essentially offset when something will happen
     * 
     *  Let's remove threshold and add rootMargin in configs for a moment
     * 
     *  If -ve value: let say -100px
     *      our container is now 100 pixels smaller than it normally would be.
     * 
     *      So from the top & bottom of our container we're essentially subtracting 100 pixels.
     * 
     *      So now everything that's going to be leaving that container is leaving it 100 pixels earlier and down here everything is coming in 100 pixels earlier.
     * 
     *      So using negative numbers we can kind of shrink our container and make things do whatever we want before they actually leave or before they enter.
     * 
     * If +ve value, let say +100px
     *      all the animations are playing when the element is 100 pixels away from becoming/appearing on the screen.
     * 
     *      Instead of appearing at the moment when isIntersecting true, when it's about 100px more to scroll to get that card on screen, it will be loaded and when user reaches that point, it'll already available or loaded before reaching that point.
     * 
     *      It helps in pre-loading of images. As images are heavy in size, it takes time to load from the server. Hence the dowloading from server will be initiated even before there's 100px for user to scroll.
     * 
     */