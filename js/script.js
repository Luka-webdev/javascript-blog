{
  'use strict';
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloudLink').innerHTML),
    authorsList: Handlebars.compile(document.querySelector('#template-authorsList').innerHTML) 
  };
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const attribute=clickedElement.getAttribute('href');
    const correctAttribute=attribute.slice(1,attribute.length);
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const article=document.getElementById(correctAttribute);
    /* [DONE] add class 'active' to the correct article */
    article.classList.add('active');
  };
  const optArticleSelector = '.post',optTitleSelector = '.post-title',optTitleListSelector = '.titles',optArticleTagsSelector ='.post-tags .list';

  const generateTitleLinks = function(customSelector = ''){
    /* [DONE] remove contents of titleList */
    const titleList=document.querySelector(optTitleListSelector);
    titleList.innerHTML='';
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for (let article of articles){
      /* [DONE] get the article id */
      const articleId=article.getAttribute('id');
      /* [DONE] find the title element and get the title from the title element*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* [DONE] create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);  
      /* insert link into titleList */
      titleList.insertAdjacentHTML('beforeend',linkHTML);
    }
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();
  const generateTags = function(){
    /* find all articles */
    const articles=document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagWrapper=article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html='';
      /* get tags from data-tags attribute */
      const tags=article.getAttribute('data-tags');
      /* split tags into array */
      const tagsArray=tags.split(' ');
      /* START LOOP: for each tag */
      for(let tag of tagsArray){
        /* generate HTML of the link */
        const linkHTMLData = {id: 'tag-'+tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        /* add generated code to html variable */
        html=html+linkHTML; 
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagWrapper.insertAdjacentHTML('beforeend',html);
      /* END LOOP: for every article: */
    }
  };
  generateTags();
  const tagClickHandler=function(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement=this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href=clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeLinks=document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for(let activeLink of activeLinks){
    /* remove class active */
      activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks=document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks){
    /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };
  const addClickListenersToTags = function(){
    /* find all links to tags */
    const links=document.querySelectorAll('.post-tags a');
    /* START LOOP: for each link */
    for(let link of (links)){
    /* add tagClickHandler as event listener for that link */
      link.addEventListener('click',tagClickHandler);
    /* END LOOP: for each link */
    }
  };
  addClickListenersToTags();
  const generateAuthors = function(){
    /* find all articles */
    const articles=document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find authors wrapper */
      const authorWrapper=article.querySelector('.post-author');
      /* get authors from data-author attribute */
      const author=article.getAttribute('data-author');
      /* generate HTML of the link */
      const linkHTMLData = {id:'author-'+ author, title: author};
      const linkHTML = templates.authorLink(linkHTMLData);
      /* insert HTML of all the links into the authors wrapper */
      authorWrapper.innerHTML=linkHTML;
      /* END LOOP: for every article: */
    }
  };
  generateAuthors();
  const authorClickHandler=function(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement=this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href=clickedElement.getAttribute('href');
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    /* find author link with class active */
    const activeLinks=document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active tag link */
    for(let activeLink of activeLinks){
      /* remove class active */
      activeLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks=document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found author link */
    for(let authorLink of authorLinks){
    /* add class active */
      authorLink.classList.add('active');
    /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
    console.log('ok');
  };
  const addClickListenersToAuthors = function(){
    /* find all links to authors */
    const links=document.querySelectorAll('.post-author a');
    /* START LOOP: for each link */
    for(let link of links){
    /* add authorClickHandler as event listener for that link */
      link.addEventListener('click',authorClickHandler);
    /* END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();

  const authors = '.authors', tags = '.tags', authorLinks = '.post-author a', tagLinks = '.post-tags a';
  // item means author or tag. It depends on the argument of the generateList function.
  const generateList = function(wrapper,links){
    //find wrapper of authors or tags.
    const listWrapper = document.querySelector(wrapper);
    const allItemsArray = [];
    //find all links with author or tags.
    const allItemsLinks = document.querySelectorAll(links);
    // push all author or tags to array.
    for(let item of allItemsLinks){
      allItemsArray.push(item.textContent);
    }
    allItemsArray.sort();
    const uniqueItemsArray = [];
    //find unique authors or tags and push them to array.
    for(let i = 0;i<allItemsArray.length;i++){
      if(allItemsArray[i] != allItemsArray[i - 1]){
        uniqueItemsArray.push(allItemsArray[i]); 
      }
    }
    for (let uniqueItem of uniqueItemsArray){
      let counter = 0;
      // count the amount of each author or tag.
      for(let j = 0;j<allItemsArray.length;j ++){
        if(uniqueItem == allItemsArray[j]){
          counter ++;
          // Change font size of each tag. 
          if(wrapper == tags){
            var classFontSize ='';
            if(counter<=2){
              classFontSize = 'text-size-1';
            }
            else if(counter>2 && counter<=4){
              classFontSize = 'text-size-2';
            }
            else if(counter>4){
              classFontSize = 'text-size-3';
            }
          }
        }
      }
      if(wrapper == tags){
        const linkHTMLDataTag = {fontSize:classFontSize, content: uniqueItem};
        const linkHTMLTag = templates.tagCloudLink(linkHTMLDataTag);
        listWrapper.insertAdjacentHTML('beforeend', linkHTMLTag);
      }
      else if(wrapper == authors){
        const linkHTMLDataAuthor = {content: uniqueItem, numb: counter};
        const linkHTMLAuthor = templates.authorsList(linkHTMLDataAuthor);
        listWrapper.insertAdjacentHTML('beforeend', linkHTMLAuthor);
      }
    }
  };
  generateList(authors,authorLinks);
  generateList(tags,tagLinks);
  
}