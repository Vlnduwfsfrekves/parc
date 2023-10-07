let page=1
let currentQuery=''
let form=document.querySelector('.search-form')
let gallery=document.querySelector('.gallery')
let butt=document.querySelector('#load-more')
async function start(isForm){
  page++
  let imagedata
  if(isForm === true){
    imagedata=await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${currentQuery}&page=${page}&per_page=12&key=39207344-802fb38289e47f3cf2d375300`).then(response=>response.json())
  }else{
    imagedata=await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&page=${page}&per_page=12&key=39207344-802fb38289e47f3cf2d375300`).then(response=>response.json())
  }
  if(imagedata.hits.length===0){
    throw new Error(`Зоображень нема`)
  }
  imagedata.hits.forEach((image)=>{
    console.log(image.pageURL)
    let card=imgCard(image)
    console.log(gallery,card)
    gallery.appendChild(card)
  })
}
function imgCard(ima){
  let card=document.createElement('div')
  card.innerHTML = `
  <div class="photo-card">
  <img src="${ima.largeImageURL}" alt="" />

  <div class="stats">
  <p class="stats-item">
    <i class="material-icons">thumb_up</i>
    ${ima.likes}
  </p>
  <p class="stats-item">
    <i class="material-icons">visibility</i>
    ${ima.views}
  </p>
  <p class="stats-item">
    <i class="material-icons">comment</i>
    ${ima.comments}
  </p>
  <p class="stats-item">
    <i class="material-icons">cloud_download</i>
    ${ima.downloads}
  </p>
  </div>
  </div>`
  return card
}
form.addEventListener('submit',async(e)=>{
  e.preventDefault()
  let query=e.target.query.value
  if(query.trim()===''){
    return
  }
  currentQuery=query
  start(true)
  console.log(query);
})
butt.addEventListener('click',async(e)=>{
  await start(currentQuery)
})