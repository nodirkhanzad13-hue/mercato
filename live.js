(function(){
  var URL_="https://hyxxmgkwfbantdapliun.supabase.co",KEY="sb_publishable_BgWY2LB_ZdDuOuKsnH-TjQ_QdAUMjz9";
  var sb=null;
  function img(el,id){
    var p=P.find(function(x){return x.id==id});
    if(p&&p.im&&!el.dataset.im){
      el.dataset.im=1;
      el.style.background='center/cover url("'+p.im+'")';
      var s=el.querySelector("span");if(s)s.style.visibility="hidden";
    }
  }
  function dec(){
    document.querySelectorAll(".card[data-id] .pic").forEach(function(el){img(el,el.closest(".card").dataset.id)});
    var b=document.querySelector("#sheet [data-act=addclose]"),pb=document.querySelector("#sheet .pic.big");
    if(b&&pb)img(pb,b.dataset.id);
  }
  async function load(){
    try{
      var r=await sb.from("products").select("*").eq("status","active").order("id",{ascending:false});
      if(r.error||!r.data)return;
      var week=Date.now()-7*864e5;
      P.length=0;
      r.data.forEach(function(x){
        P.push({id:x.id,n:x.name,c:x.category,p:x.price,o:x.old_price||0,r:"–",e:IC[x.category]||"📦",d:x.description||"",im:x.image_url||"",nw:new Date(x.created_at).getTime()>week?1:0});
      });
      Object.keys(cart).forEach(function(id){if(!byId(id))delete cart[id]});
      sv("mg_cart",cart);
      cats();tabs();grid();bar();dec();
    }catch(e){}
