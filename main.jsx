import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  AppBar, Box, Button, Card, CardContent, CardMedia, Chip, Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton,
  MenuItem, Select, Stack, TextField, Toolbar, Typography
} from '@mui/material';
import {
  Add, Call, Edit, Favorite, FavoriteBorder, Home, OpenInNew,
  WhatsApp, Close, Search
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#111827' },
    success: { main: '#16a34a' },
    background: { default: '#f3f4f6' }
  },
  shape: { borderRadius: 16 },
  typography: { fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }
});

const initialProperties = [
  {
    id: 'ana-1', seller: 'Ana Sandoval', agency: 'JAUS', phone: '+52 1 735 177 9185', wa: '5217351779185',
    title: 'Casa remodelada en Lomas de Cocoyoc', price: 4500000,
    image: 'https://assets.easybroker.com/property_images/6158556/109287126/EB-WQ8556.jpg?version=1786325825',
    url: 'https://www.jausinmobiliaria.com/property/casa-remodelada-en-venta-en-lomas-de-cocoyoc',
    detail: '3 rec · 2 baños · 180 m² const. · 350 m² terreno', favorite: false
  },
  {
    id: 'ana-2', seller: 'Ana Sandoval', agency: 'JAUS', phone: '+52 1 735 177 9185', wa: '5217351779185',
    title: 'Casa en Lomas de Cocoyoc', price: 4800000,
    image: 'https://assets.easybroker.com/property_images/5393828/93247244/EB-TS3828.jpg?version=1752978840',
    url: 'https://www.jausinmobiliaria.com/property/venta-de-casa-en-lomas-de-cocoyoc-e48916ca-45ef-40e6-bdcb-f4746c4a2953',
    detail: '3 rec · 2 baños · 170 m² const. · 480 m² terreno', favorite: false
  },
  {
    id: 'ana-3', seller: 'Ana Sandoval', agency: 'JAUS', phone: '+52 1 735 177 9185', wa: '5217351779185',
    title: 'Casa en Lomas de Cocoyoc', price: null,
    image: '',
    url: 'https://www.jausinmobiliaria.com/property/venta-de-casa-en-lomas-de-cocoyoc-c40c27b3-245b-4db6-b081-ec62982f96a5',
    detail: 'Precio y foto pendientes de verificar', favorite: false
  },
  {
    id: 'alma-pincali', seller: 'Alma García Casas', agency: '', phone: '+52 1 735 201 5565', wa: '5217352015565',
    title: 'Casa en Lomas de Cocoyoc · EB-WG8028', price: 5600000,
    image: 'https://assets.easybroker.com/property_images/6058028/107127823/EB-WG8028.jpeg?version=1781591001',
    url: 'https://www.pincali.com/inmueble/casa-en-venta-en-lomas-de-cocoyoc-b9e68bb9-c069-4f6c-abfc-d1c2ee4b380f',
    detail: '3 rec · 2.5 baños · 145 m² const. · 449.96 m² terreno', favorite: false
  },
  {
    id: 'alma-uu9367', seller: 'Alma García Casas', agency: '', phone: '+52 1 735 201 5565', wa: '5217352015565',
    title: 'Casa en Lomas de Cocoyoc · EB-UU9367', price: 4900000,
    image: 'https://assets.easybroker.com/property_images/5679367/107127486/EB-UU9367.jpeg?version=1781588884',
    url: 'https://globalhom.com.mx/property-details.php?public_id=EB-UU9367',
    detail: '3 rec · 2 baños · 165 m² const. · 385 m² terreno', favorite: false
  },
  {
    id: 'alma-wf4040', seller: 'Alma García Casas', agency: '', phone: '+52 1 735 201 5565', wa: '5217352015565',
    title: 'Casa en Lomas de Cocoyoc · EB-WF4040', price: 4950000,
    image: 'https://assets.easybroker.com/property_images/6044040/107340352/EB-WF4040.jpeg?version=1782007468',
    url: 'https://globalhom.com.mx/property-details.php?public_id=EB-WF4040',
    detail: '3 rec · 2 baños · 350 m² terreno', favorite: false
  },
  {
    id: 'alma-vg3696', seller: 'Alma García Casas', agency: '', phone: '+52 1 735 201 5565', wa: '5217352015565',
    title: 'Casa en Lomas de Cocoyoc · EB-VG3696', price: 5100000,
    image: 'https://assets.easybroker.com/property_images/5793696/101571139/EB-VG3696.jpeg?version=1770433839',
    url: 'https://globalhom.com.mx/property-details.php?public_id=EB-VG3696',
    detail: '3 rec · 2 baños · 160 m² const. · 350 m² terreno', favorite: false
  },
  {
    id: 'alma-vt4733', seller: 'Alma García Casas', agency: '', phone: '+52 1 735 201 5565', wa: '5217352015565',
    title: 'Casa en Lomas de Cocoyoc · EB-VT4733', price: 5300000,
    image: 'https://assets.easybroker.com/property_images/5924733/104318681/EB-VT4733.jpeg?version=1775918977',
    url: 'https://globalhom.com.mx/property-details.php?public_id=EB-VT4733',
    detail: '3 rec · 2 baños · 145 m² const. · 350 m² terreno', favorite: false
  },
  {
    id: 'alma-wg8028', seller: 'Alma García Casas', agency: '', phone: '+52 1 735 201 5565', wa: '5217352015565',
    title: 'Casa en Lomas de Cocoyoc · EB-WG8028', price: 5600000,
    image: 'https://assets.easybroker.com/property_images/6058028/107127823/EB-WG8028.jpeg?version=1781591001',
    url: 'https://globalhom.com.mx/property-details.php?public_id=EB-WG8028',
    detail: 'Misma propiedad que el enlace de Pincali', favorite: false
  },
  {
    id: 'alma-uu8686', seller: 'Alma García Casas', agency: '', phone: '+52 1 735 201 5565', wa: '5217352015565',
    title: 'Casa en preventa · EB-UU8686', price: 5800001,
    image: 'https://assets.easybroker.com/property_images/5678686/107127530/EB-UU8686.jpeg?version=1781589056',
    url: 'https://globalhom.com.mx/property-details.php?public_id=EB-UU8686',
    detail: '3 rec · 2 baños · 150 m² const. · 350 m² terreno', favorite: false
  },
  {
    id: 'alma-ws4236', seller: 'Alma García Casas', agency: '', phone: '+52 1 735 201 5565', wa: '5217352015565',
    title: 'Casa en Lomas de Cocoyoc · EB-WS4236', price: 6200000,
    image: 'https://assets.easybroker.com/property_images/6174236/109635422/EB-WS4236.jpeg?version=1787014175',
    url: 'https://globalhom.com.mx/property-details.php?public_id=EB-WS4236',
    detail: '4 rec · 4 baños · 270 m² const. · 350 m² terreno', favorite: false
  },
  {
    id: 'alma-ws4281', seller: 'Alma García Casas', agency: '', phone: '+52 1 735 201 5565', wa: '5217352015565',
    title: 'Casa en Lomas de Cocoyoc · EB-WS4281', price: 5500000,
    image: 'https://assets.easybroker.com/property_images/6174281/109636430/EB-WS4281.jpeg?version=1787015758',
    url: 'https://globalhom.com.mx/property-details.php?public_id=EB-WS4281',
    detail: '3 rec · 2 baños · 400 m² const. · 450 m² terreno', favorite: false
  },
  {
    id: 'dulce-1', seller: 'Dulce', agency: '', phone: '', wa: '',
    title: 'Casa amueblada en Lomas de Cocoyoc · EB-UJ1569', price: 4900000,
    image: 'https://assets.easybroker.com/property_images/5561569/96682552/EB-UJ1569.jpg?version=1759698693',
    url: 'https://www.pincali.com/inmueble/casa-amueblada-en-venta-en-lomas-de-cocoyoc',
    detail: '4 rec · 4 baños · 197 m² const. · 350 m² terreno', favorite: false
  },
  {
    id: 'fernando-1', seller: 'Fernando', agency: 'Wortel Bienes Raíces', phone: '+52 1 55 5415 2639', wa: '5215554152639',
    title: 'Venta de Casa Lomas de Cocoyoc · 350 m²', price: 4900000,
    image: 'https://assets.easybroker.com/property_images/5483761/95083350/EB-UB3761.jpg?version=1756489460',
    url: 'https://www.wortelbienesraices.com/property/venta-de-casa-lomas-de-cocoyoc-350-m2?agent=wortel&lang=es',
    detail: '350 m² terreno', favorite: false
  }
];

const emptyProperty = {
  id: '', seller: '', agency: '', phone: '', wa: '', title: '', price: '', image: '', url: '', detail: '', favorite: false
};

function money(value) {
  if (value === null || value === '' || Number.isNaN(Number(value))) return 'Precio por verificar';
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(Number(value));
}

function normalizeWa(phone) {
  return (phone || '').replace(/\D/g, '');
}

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cocoyoc-properties-v2');
    return saved ? JSON.parse(saved) : initialProperties;
  });
  const [seller, setSeller] = useState('Todos');
  const [query, setQuery] = useState('');
  const [onlyFav, setOnlyFav] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    localStorage.setItem('cocoyoc-properties-v2', JSON.stringify(items));
  }, [items]);

  const sellers = useMemo(() => ['Todos', ...Array.from(new Set(items.map(x => x.seller).filter(Boolean)))], [items]);

  const filtered = useMemo(() => items.filter(x => {
    const sellerOk = seller === 'Todos' || x.seller === seller;
    const favOk = !onlyFav || x.favorite;
    const text = `${x.title} ${x.seller} ${x.detail}`.toLowerCase();
    const queryOk = text.includes(query.toLowerCase());
    return sellerOk && favOk && queryOk;
  }), [items, seller, query, onlyFav]);

  const save = (value) => {
    const normalized = {
      ...value,
      id: value.id || `property-${Date.now()}`,
      price: value.price === '' ? null : Number(value.price),
      wa: value.wa || normalizeWa(value.phone)
    };
    setItems(prev => prev.some(x => x.id === normalized.id)
      ? prev.map(x => x.id === normalized.id ? normalized : x)
      : [normalized, ...prev]
    );
    setEditing(null);
  };

  const toggleFavorite = id => setItems(prev => prev.map(x => x.id === id ? { ...x, favorite: !x.favorite } : x));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 12 }}>
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(17,24,39,.96)', backdropFilter: 'blur(10px)' }}>
          <Toolbar sx={{ gap: 1 }}>
            <Home />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={800}>Casas · Lomas de Cocoyoc</Typography>
              <Typography variant="caption" sx={{ opacity: .75 }}>{items.length} publicaciones guardadas</Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="sm" sx={{ pt: 2 }}>
          <Stack spacing={1.2} sx={{ mb: 2 }}>
            <TextField
              fullWidth size="small" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Buscar casa o vendedor..."
              InputProps={{ startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> }}
            />
            <Stack direction="row" spacing={1}>
              <Select size="small" value={seller} onChange={e => setSeller(e.target.value)} sx={{ flex: 1, bgcolor: 'white' }}>
                {sellers.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
              <Button variant={onlyFav ? 'contained' : 'outlined'} onClick={() => setOnlyFav(v => !v)} startIcon={<Favorite />}>
                Favoritas
              </Button>
            </Stack>
          </Stack>

          <Stack spacing={2}>
            {filtered.map(item => (
              <Card key={item.id} elevation={0} sx={{ overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                {item.image ? (
                  <CardMedia component="img" height="220" image={item.image} alt={item.title} sx={{ objectFit: 'cover' }} />
                ) : (
                  <Box sx={{ height: 220, display: 'grid', placeItems: 'center', bgcolor: '#e5e7eb' }}>
                    <Typography color="text.secondary">🏠 Foto pendiente</Typography>
                  </Box>
                )}
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1}>
                    <Box sx={{ minWidth: 0 }}>
                      <Chip label={item.agency ? `${item.seller} · ${item.agency}` : item.seller} size="small" sx={{ mb: 1 }} />
                      <Typography variant="h5" fontWeight={900}>{money(item.price)}</Typography>
                    </Box>
                    <Stack direction="row">
                      <IconButton onClick={() => toggleFavorite(item.id)} aria-label="favorito">
                        {item.favorite ? <Favorite color="error" /> : <FavoriteBorder />}
                      </IconButton>
                      <IconButton onClick={() => setEditing({ ...item })} aria-label="editar"><Edit /></IconButton>
                    </Stack>
                  </Stack>

                  <Typography variant="subtitle1" fontWeight={800} sx={{ mt: .7 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>{item.detail}</Typography>
                  {item.phone && <Typography variant="body2" sx={{ mt: 1 }}>📱 {item.phone}</Typography>}

                  <Stack spacing={1} sx={{ mt: 1.5 }}>
                    <Button fullWidth variant="contained" href={item.url} target="_blank" startIcon={<OpenInNew />}>Ver publicación</Button>
                    <Stack direction="row" spacing={1}>
                      <Button
                        fullWidth variant="contained" color="success" startIcon={<WhatsApp />}
                        href={item.wa ? `https://wa.me/${item.wa}` : undefined}
                        disabled={!item.wa} target="_blank"
                      >WhatsApp</Button>
                      <Button
                        fullWidth variant="outlined" startIcon={<Call />}
                        href={item.phone ? `tel:${item.phone.replace(/\s/g,'')}` : undefined}
                        disabled={!item.phone}
                      >Llamar</Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>

        <Fab color="primary" onClick={() => setEditing({ ...emptyProperty })} sx={{ position: 'fixed', right: 18, bottom: 22 }}>
          <Add />
        </Fab>

        <EditDialog value={editing} onClose={() => setEditing(null)} onSave={save} />
      </Box>
    </ThemeProvider>
  );
}

function EditDialog({ value, onClose, onSave }) {
  const [form, setForm] = useState(value || emptyProperty);
  useEffect(() => setForm(value || emptyProperty), [value]);
  if (!value) return null;
  const field = name => ({
    value: form[name] ?? '',
    onChange: e => setForm(prev => ({ ...prev, [name]: e.target.value }))
  });
  return (
    <Dialog open fullScreen onClose={onClose}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose}><Close /></IconButton>
          <Typography variant="h6" sx={{ flex: 1 }}>Editar propiedad</Typography>
          <Button color="inherit" onClick={() => onSave(form)} sx={{ fontWeight: 800 }}>Guardar</Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Nombre de la casa" fullWidth {...field('title')} />
          <TextField label="Precio" type="number" fullWidth {...field('price')} />
          <TextField label="Vendedor/a" fullWidth {...field('seller')} />
          <TextField label="Inmobiliaria" fullWidth {...field('agency')} />
          <TextField label="Teléfono" fullWidth {...field('phone')} />
          <TextField label="WhatsApp (solo números)" fullWidth {...field('wa')} />
          <TextField label="URL publicación" fullWidth {...field('url')} />
          <TextField label="URL foto" fullWidth {...field('image')} />
          <TextField label="Notas / características" fullWidth multiline minRows={3} {...field('detail')} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} fullWidth>Cancelar</Button>
        <Button onClick={() => onSave(form)} fullWidth variant="contained">Guardar cambios</Button>
      </DialogActions>
    </Dialog>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);
