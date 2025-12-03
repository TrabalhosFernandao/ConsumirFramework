import { render, Component } from 'inferno';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      isLoading: true,
      error: null
    };
  }

  componentDidMount() {

    const API_TOKEN = 'MjU5MDcwXzE3NjQ4MDU3MTlfZGQ1MDQwYzAxYmYwYWUwZDc0OTZkMmJlMDIwZWI2YzBkMmQ1ZGVmYQ=='; 
  

    fetch(`https://www.scorebat.com/video-api/v3/feed/?token=${API_TOKEN}`)
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar vídeos. Verifique seu Token.');
        return res.json();
      })
      .then(data => {
        // A API retorna um objeto { response: [...] }, então pegamos o .response
        this.setState({ matches: data.response, isLoading: false });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { matches, isLoading, error } = this.state;

    if (error) {
      return (
        <div style={{ color: '#ff4444', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h3>Erro ao carregar:</h3>
          <p>{error.message || error}</p>
          <small>Você pegou o token no site da ScoreBat?</small>
        </div>
      );
    }

    if (isLoading) {
      return <div style={{ color: '#fff', textAlign: 'center', marginTop: '20px', fontFamily: 'sans-serif' }}>Carregando lances... ⚽</div>;
    }

    return (
      <div style={{ 
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', 
        padding: '20px', 
        backgroundColor: '#1e272e', 
        minHeight: '100vh', 
        color: '#fff' 
      }}>
        <h1 style={{ textAlign: 'center', color: '#0be881', marginBottom: '30px' }}>
          ⚽ ScoreBat Highlights
        </h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px',
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          {matches.map((match, index) => (
            <div key={index} style={{ 
              background: '#2d3436',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
              {/* Imagem da partida */}
              <div style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
                <img 
                  src={match.thumbnail} 
                  alt={match.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Informações */}
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1em', color: '#fab1a0' }}>
                  {match.title}
                </h3>
                <p style={{ margin: '0 0 15px 0', fontSize: '0.9em', color: '#b2bec3' }}>
                  🏆 {match.competition}
                </p>
                
                <p style={{ fontSize: '0.8em', color: '#dfe6e9' }}>
                  📅 {new Date(match.date).toLocaleDateString()}
                </p>

                {/* Botão para assistir */}
                <a 
                  href={match.matchviewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    backgroundColor: '#0984e3',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    marginTop: '10px'
                  }}
                >
                  ▶ Assistir Lances
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));