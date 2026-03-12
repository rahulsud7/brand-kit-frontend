export default function PhonePreview({ kit, brandName }) {

  if (!kit) return null;

  const primary = kit.colors?.[0]?.hex || "#6366F1";

  return (

    <div style={{
      width:260,
      height:520,
      borderRadius:30,
      padding:20,
      background:"#000",
      boxShadow:"0 30px 60px rgba(0,0,0,0.6)",
      color:"white",
      fontFamily:"sans-serif"
    }}>

      <div style={{
        textAlign:"center",
        marginBottom:20
      }}>

        <div
          dangerouslySetInnerHTML={{__html:kit.logo_svg}}
          style={{ marginBottom:10 }}
        />

        <h3>{brandName}</h3>

        <p style={{
          fontSize:12,
          opacity:0.7
        }}>
          {kit.instagram_bio}
        </p>

      </div>

      <div style={{
        marginTop:20,
        padding:12,
        borderRadius:12,
        background:primary
      }}>

        <p style={{ fontSize:13 }}>
          {kit.captions?.[0]}
        </p>

      </div>

    </div>

  );

}