1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

getElementById >> one element by ID

getElementsByClassName >> many elements class name 
querySelector >> first match

querySelectorAll >> all 

2. How do you create and insert a new element into the DOM?

Use document.createElement() >> set content>>  insert with appendChild.

3. What is Event Bubbling and how does it work?

Event starts from the main point element and go to up like bubbles through upper until it reaches the buttom.

4. What is Event Delegation in JavaScript? Why is it useful?

Add one event listener to a main and detect actions from children using event.target.


5. What is the difference between preventDefault() and stopPropagation() methods?

preventDefault() >> stops browsers  link opening or submit.

stopPropagation() → stops event from bubbling up.