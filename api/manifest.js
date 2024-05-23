

export default (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    const manifest = {
      "url": "https://tg-mini.vercel.app",
      "name": "Mobifi",
      "iconUrl": "https://tg-mini.vercel.app/public/icon.jpg"
    };
  
    res.status(200).json(manifest);
  };
  