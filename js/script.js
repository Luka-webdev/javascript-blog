{
  'use strict';
  
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
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';  
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
        const link='<a href="#tag-'+tag+'">'+tag+'</a>&nbsp';
        /* add generated code to html variable */
        html=html+link; 
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagWrapper.insertAdjacentHTML('beforebegin',html);
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
      const author=authorWrapper.getAttribute('data-author');
      /* generate HTML of the link */
      const link='<a href="#author-'+author+'">'+author+'</a>';
      /* insert HTML of all the links into the authors wrapper */
      authorWrapper.innerHTML=link;
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
    const activeLink=document.querySelector('.active a[href^="#author-"]');
    /* remove class active */
    activeLink.classList.remove('active');
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
  };
  const addClickListenersToAuthors = function(){
    /* find all links to authors */
    const links=document.querySelectorAll('.post-author a');
    /* START LOOP: for each link */
    for(let link of (links)){
    /* add authorClickHandler as event listener for that link */
      link.addEventListener('click',authorClickHandler);
    /* END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();
  // const generateTagsList = function(){
  //   const listTagsWrapper = document.querySelector('.tags');
  //   const allTagsArray = [];
  //   const allTagsLinks = document.querySelectorAll('.post-tags a');
  //   for(let tag of allTagsLinks){
  //     allTagsArray.push(tag.textContent);
  //   }
  //   allTagsArray.sort();
  //   const uniqeTagsArray = [];
  //   for(let i=0;i<allTagsArray.length;i++){
  //     if(allTagsArray[i] != allTagsArray[i-1]){
  //       uniqeTagsArray.push(allTagsArray[i]);
  //     }
  //   }
  //   for (let uniqueTag of uniqeTagsArray){
  //     let counter = 0;
  //     for(let j=0;j<allTagsArray.length;j++){
  //       if(uniqueTag == allTagsArray[j]){
  //         counter++;
  //       }
  //     }
  //     const link='<li><a href="#">'+uniqueTag+'</a> ('+counter+')</li>';
  //     listTagsWrapper.insertAdjacentHTML('beforeend',link);
  //   }
  // };
  // generateTagsList();
  // const generateAuthorsList = function(){
  //   const listAuthorsWrapper = document.querySelector('.authors');
  //   const allAuthorsArray = [];
  //   const allAuthorsLinks = document.querySelectorAll('.post-author a');
  //   for(let author of allAuthorsLinks){
  //     allAuthorsArray.push(author.textContent);
  //   }
  //   allAuthorsArray.sort();
  //   const uniqeAuthorsArray = [];
  //   for(let i=0;i<allAuthorsArray.length;i++){
  //     if(allAuthorsArray[i] != allAuthorsArray[i-1]){
  //       uniqeAuthorsArray.push(allAuthorsArray[i]);
  //     }
  //   }
  //   for (let uniqueAuthor of uniqeAuthorsArray){
  //     let counter = 0;
  //     for(let j=0;j<allAuthorsArray.length;j++){
  //       if(uniqueAuthor == allAuthorsArray[j]){
  //         counter++;
  //       }
  //     }
  //     const link='<li><a href="#">'+uniqueAuthor+'</a> ('+counter+')</li>';
  //     listAuthorsWrapper.insertAdjacentHTML('beforeend',link);
  //   }
  //   console.log(allAuthorsArray);
  //   console.log(uniqeAuthorsArray);
  // };
  // generateAuthorsList();

  const authors = '.authors', tags = '.tags', authorLinks = '.post-author a', tagLinks = '.post-tags a';

  const generateList = function(wrapper,links){
    const listWrapper = document.querySelector(wrapper);
    const allItemsArray = [];
    const allItemsLinks = document.querySelectorAll(links);
    for(let item of allItemsLinks){
      allItemsArray.push(item.textContent);
    }
    allItemsArray.sort();
    const uniqeItemsArray = [];
    for(let i = 0;i<allItemsArray.length;i++){
      if(allItemsArray[i] != allItemsArray[i - 1]){
        uniqeItemsArray.push(allItemsArray[i]);
      }
    }
    for (let uniqueItem of uniqeItemsArray){
      let counter = 0;
      for(let j = 0;j<allItemsArray.length;j ++){
        if(uniqueItem == allItemsArray[j]){
          counter ++;
        }
      }
      const link='<li><a href="#">'+ uniqueItem +'</a> ('+ counter +')</li>';
      listWrapper.insertAdjacentHTML('beforeend', link);
    }
  };
  generateList(authors,authorLinks);
  generateList(tags,tagLinks);
}