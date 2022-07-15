// Helper to prevent duplicate addEventListener handler 
// src: https://stackoverflow.com/q/64155405
function elementWithOneEventListener(el){
    el.oneEventListener = function(event, func) {
        if(el.lastEventListener == null){
          el.lastEventListener = {};
        }
        if(el.lastEventListener[event] != null){
          el.removeEventListener(event, el.lastEventListener[event]);
        }
        el.addEventListener(event, func);
        el.lastEventListener[event] = func;
    }
    return el;
}
function preventDuplicateListenerProxy(el) {
  if(!(el instanceof NodeList)){
    return elementWithOneEventListener(el);
  }else{
    el.forEach(function(ele) {
      ele = elementWithOneEventListener(ele);
    });
    return el;
  }
}

function generateRightSideBarContent() {
  setTimeout(function() {
    //right sidebar content
    var sideBarSelector = document.getElementById('right-bar-content')
    var sideBarContens = ''
    var getAllTitle = document.querySelectorAll("h2,h3")

    if(getAllTitle.length == 0) {
      getAllTitle = document.querySelectorAll("h1");
    }

    if(getAllTitle) {
      getAllTitle.forEach(function(element) {
        var titleText = element.innerText
        var titleId = element.id
        var linkPrefix = ""
        if(window.willUseDocsifyHashRouter){
          try {
            linkPrefix = ((window.location.href).split('?id='))[0]
          } catch(e) { }
        }

        if(titleId) {
          sideBarContens += '<li class="sidebar__right-list '+ element.localName  +'"><a href="'+ linkPrefix +'?id='+ titleId +'" class="sidebar__right-link sidebar__right-link--active">'+ titleText +'</a></li>'
        }
      });

      if(sideBarSelector) {
        sideBarSelector.innerHTML = sideBarContens
      }
    } 
  }, 150);
}

// for accordion icon (rotate icon) on click
// @TODO: optimize this to prevent duplicated listener
function applyAccordionLabelTagListener() {
  setTimeout(function() {
    var accordionLabelSelector = document.querySelectorAll('.collaps-label')
    if( accordionLabelSelector ) {
      accordionLabelSelector.forEach(function(element) {
        element.addEventListener('click', function() {
          if( element.classList.contains('open') ) {
            element.classList.remove('open')
          }else {
            element.classList.add('open')
          }
        });
      });
    }
  }, 50);
}

// add active to right side menus on scroll
function activateRightMenuOnScroll() {
  setTimeout(function() {
    var contentHeaders = document.querySelectorAll('h2[id], h3[id]');
    var navLinks = document.querySelectorAll(".sidebar__right-list");
    var navLinkWrapper = document.querySelector(".sidebar__right-wrapper") ;

    if(contentHeaders.length == 0) {
      contentHeaders = document.querySelectorAll('h1[id]');
    }
    if(!contentHeaders.length || !navLinks.length) { return 0; } //exit if no element found
    var prevActiveHeaderIdx = -1;

    // prevent scroll event listener to be added onEach docsify hook
    var windowProxyEl = preventDuplicateListenerProxy(window);
    windowProxyEl.oneEventListener("scroll", function (event) {
      // note: debounce not needed, it cause unresponsive feel
      event.preventDefault();
      var scrollPos =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      var docsifyTopOffset = window.$docsify.topMargin 
        || 100;

      var lowestDistance = Number.MAX_VALUE;
      var activeHeaderIdx = 0;

      // scan all content header from top
      for (var i = 0; i < contentHeaders.length; i++) {
        // find the active header by shortest distance from each header to scroll-y
        var distance = (scrollPos + docsifyTopOffset) - contentHeaders[i].offsetTop;
        if(distance >= 0 && distance <= lowestDistance){
          activeHeaderIdx = i;
          lowestDistance = distance;
        }
        // stop if distance is getting bigger, shortest already found
        if(distance > lowestDistance){ break; }
      }

      if(activeHeaderIdx == prevActiveHeaderIdx){
        // no active nav link changes needed, stop early
        prevActiveHeaderIdx = activeHeaderIdx;
        return 0;
      }

      // deactivate all previous active nav links
      var prevActiveNavLinks = document.querySelectorAll(".sidebar__right-list.active");
      for (var i = prevActiveNavLinks.length - 1; i >= 0; i--) {
        prevActiveNavLinks[i].classList.remove("active");
      }
      // only activate the current one
      var currentActiveNavLinks = navLinks[activeHeaderIdx];
      currentActiveNavLinks.classList.add("active");

      // Keep active navLinks in visible viewport
      if(navLinkWrapper == null){ return 0; }
      var viewBuffer = docsifyTopOffset;
      var navLinkWrapperRect = navLinkWrapper.getBoundingClientRect();
      var upperViewThreshold = navLinkWrapperRect.top + viewBuffer;
      var lowerViewThreshold = navLinkWrapperRect.bottom - viewBuffer;
      var navLinkWrapperHeight = navLinkWrapperRect.height;
      var currentActiveNavLinksRect = currentActiveNavLinks.getBoundingClientRect();

      // active navLink way above view
      if(currentActiveNavLinksRect.top <= upperViewThreshold){
        navLinkWrapper.scrollTo(0, currentActiveNavLinks.offsetTop - viewBuffer);
      } 
      // active navLink way below view
      else if (currentActiveNavLinksRect.top >= lowerViewThreshold) {
        navLinkWrapper.scrollTo(0, currentActiveNavLinks.offsetTop - navLinkWrapperHeight + viewBuffer);
      }
    });
  }, 170);
  
}

// THEME CHANGER
function applySavedTheme() { // check from localstorage
  //check localstorage
  if(localStorage.getItem('theme') == 'dark') {
    document.getElementsByTagName('body')[0].classList.add('theme__dark')
    var checkboxThemeEl = document.querySelectorAll('.checkbox-theme')
    if(checkboxThemeEl) {
      checkboxThemeEl.forEach(function(element) {
        element.checked = true;
      });
    }
    
    replaceLogoImageDarkMode('dark')
    
  }
}
function changeTheme(param) {
  var body = document.getElementsByTagName('body')[0]
  var checkboxThemeEl = document.querySelectorAll('.checkbox-theme')
  if(!localStorage.getItem('theme')) { // set to dark mode
    replaceLogoImageDarkMode('dark')
    if(body.classList.contains('theme__light')) {
      body.classList.remove('theme__light')
    }
    body.classList.add('theme__dark')
    //store to local storage
    localStorage.setItem('theme', 'dark')
    
  } else if(localStorage.getItem('theme') == 'dark') { // set to light mode
    replaceLogoImageDarkMode('light')
    if(checkboxThemeEl) {
      checkboxThemeEl.forEach(function(element) {
        element.checked = false;
      });
    }
    body.classList.remove('theme__dark')
    //remove local storage
    localStorage.removeItem('theme')
  } else {
    return false
  }
  
}

function replaceLogoImageDarkMode(theme) {
  setTimeout(function() {
    //replace all midtrans logo to white
    var getAllImg = document.querySelectorAll('img')
    if(getAllImg) {
      getAllImg.forEach(function(element) {
        var checkSrc = theme == 'dark' ? "midtrans-logo.png" : "midtrans-logo-white.png";
        if(element.currentSrc.indexOf(checkSrc)>=0) {
          element.src = theme == 'dark' ? 
            element.src.replace("midtrans-logo.png", "midtrans-logo-white.png") : 
            element.src.replace("midtrans-logo-white.png", "midtrans-logo.png")
        }
      });
    }
  }, 500);
}

function previewSnap(el){
  el.innerText = 'Processing...';

  // load snap.js script tag dynamically
  if(!window.snapScriptLoaded){
    var snapScriptEl = document.createElement('script');
    snapScriptEl.setAttribute('src','https://app.sandbox.midtrans.com/snap/snap.js');
    snapScriptEl.setAttribute('data-client-key','SB-Mid-client-61XuGAwQ8Bj8LxSS');
    document.head.appendChild(snapScriptEl); 
    window.snapScriptLoaded = 1;
  }
  
  var reqHeaders = new Headers();
  reqHeaders.append('Accept', 'application/json');
  reqHeaders.append('Content-Type', 'application/json');
  reqHeaders.append('Authorization', 'Basic '+btoa('SB-Mid-server-GwUP_WGbJPXsDzsNEBRs8IYA:'));
  var reqOpts = {
    method: 'POST',
    headers: reqHeaders,
    body: JSON.stringify({
      'transaction_details':{
        'order_id':'demo-docs-main-'+Math.round((new Date()).getTime()/1),
        'gross_amount':10000
      },
      'credit_card':{
        'secure':true
      }
    })
  };
  var corsProxyUrl = '/.netlify/functions/demo-api-cors-proxy/';
  if(window.location.hostname == 'localhost'){
    // point to Prod env, so request work on localhost env
    corsProxyUrl = 'https://docs.midtrans.com'+corsProxyUrl;
  }
  fetch(corsProxyUrl+'?url=https://app.sandbox.midtrans.com/snap/v1/transactions', reqOpts)
    .then(function(res){ return res.json() })
    .then(function(res){
      let snapToken = res.token;
      snap.pay(snapToken,{
        onSuccess: function(res){ console.log('Snap result:',res) },
        onPending: function(res){ console.log('Snap result:',res) },
        onError: function(res){ console.log('Snap result:',res) },
      });
    })
    .catch( function(e){ console.error(e); window.open('https://demo.midtrans.com', '_blank'); } )
    .finally( function(e){ el.innerText = 'Preview Snap UI ⎋' })
}