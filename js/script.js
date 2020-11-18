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

  const generateTitleLinks = function(){
    /* [DONE] remove contents of titleList */
    const titleList=document.querySelector(optTitleListSelector);
    titleList.innerHTML='';
    /* [DONE] for each article */
    const articles=document.querySelectorAll(optArticleSelector);
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
}