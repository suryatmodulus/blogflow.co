import B from 'phenomenon';
var M = 'phi',
  R = 'theta',
  c = 'mapSamples',
  O = 'mapBrightness',
  N = 'baseColor',
  G = 'markerColor',
  s = 'glowColor',
  S = 'markers',
  P = 'diffuse',
  X = 'devicePixelRatio',
  f = 'dark',
  u = 'offset',
  m = 'scale',
  x = 'opacity',
  l = 'mapBaseBrightness',
  I = {
    [M]: 'A',
    [R]: 'B',
    [c]: 'l',
    [O]: 'E',
    [N]: 'R',
    [G]: 'S',
    [s]: 'y',
    [P]: 'F',
    [f]: 'G',
    [u]: 'x',
    [m]: 'C',
    [x]: 'H',
    [l]: 'I',
  },
  { PI: i, sin: d, cos: U } = Math,
  C = (r) =>
    [].concat(
      ...r.map((E) => {
        let [_, o] = E.location;
        (_ = (_ * i) / 180), (o = (o * i) / 180 - i);
        let a = U(_);
        return [-a * U(o), d(_), a * d(o), E.size];
      }),
      [0, 0, 0, 0]
    ),
  p = (r, E) => {
    let _ = (e, t, L) => ({
        type: e,
        value: typeof E[t] == 'undefined' ? L : E[t],
      }),
      o = r.getContext('webgl') ? 'webgl' : 'experimental-webgl',
      a = new B({
        canvas: r,
        contextType: o,
        context: {
          alpha: !0,
          stencil: !1,
          antialias: !0,
          depth: !1,
          preserveDrawingBuffer: !1,
          ...E.context,
        },
        settings: {
          [X]: E[X] || 1,
          onSetup: (e) => {
            let t = e.RGB,
              L = e.UNSIGNED_BYTE,
              n = e.TEXTURE_2D,
              T = e.createTexture();
            e.bindTexture(n, T),
              e.texImage2D(
                n,
                0,
                t,
                1,
                1,
                0,
                t,
                L,
                new Uint8Array([0, 0, 0, 0])
              );
            let A = new Image();
            (A.onload = () => {
              e.bindTexture(n, T),
                e.texImage2D(n, 0, t, t, L, A),
                e.generateMipmap(n);
              let h = e.getParameter(e.CURRENT_PROGRAM),
                v = e.getUniformLocation(h, 'J');
              e.texParameteri(n, e.TEXTURE_MIN_FILTER, e.NEAREST),
                e.texParameteri(n, e.TEXTURE_MAG_FILTER, e.NEAREST),
                e.uniform1i(v, 0);
            }),
              (A.src =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACAAQAAAADMzoqnAAAAAXNSR0IArs4c6QAABA5JREFUeNrV179uHEUAx/Hf3JpbF+E2VASBsmVKTBcpKJs3SMEDcDwBiVJAAewYEBUivIHT0uUBIt0YCovKD0CRjUC4QfHYh8hYXu+P25vZ2Zm9c66gMd/GJ/tz82d3bk8GN4SrByYF2366FNTACIAkivVAAazQdnf3MvAlbNUQfOPAdQDvSAimMWhwy4I2g4SU+Kp04ISLpPBAKLxPyic3O/CCi+Y7rUJbiodcpDOFY7CgxCEXmdYD2EYK2s5lApOx5pEDDYCUwM1XdJUwBV11QQMg59kePSCaPAASQMEL2hwo6TJFgxpg+TgC2ymXPbuvc40awr3D1QCFfbH9kcoqAOkZozpQo0aqAGQRKCog/+tjkgbNFEtg2FffBvBGlSxHoAaAa1u6X4PBAwDiR8FFsrQgeUhfJTSALaB9jy5NCybJPn1SVFiWk7ywN+KzhH1aKAuydhGkbEF4lWohLXDXavlyFgHY7LBnLRdlAP6BS5Cc8RfVDXbkwN/oIvmY+6obbNeBP0JwTuMGu9gTzy1Q4RS/cWpfzszeYwd+CAFrtBW/Hur0gLbJGlD+/OjVwe/drfBxkbbg63dndEDfiEBlAd7ac0BPe1D6Jd8dfbLH+RI0OzseFB5s01/M+gMdAeluLOCAuaUA9Lezo/vSgXoCX9rtEiXnp7Q1W/CNyWcd8DXoS6jH/YZ5vAJEWY2dXFQe2TUgaFaNejCzJ98g6HnlVrsE58sDcYqg+9XY75fPqdoh/kRQWiXKg8MWlJQxUFMPjqnyujhFBE7UxIMjyszk0QwQlFsezImsyvUYYYVED2pk6m0Tg8T04Fwjk2kdAwSACqlM6gRRt3vQYAFGX0Ah7Ebx1H+MDRI5ui0QldH4j7FGcm90XdxD2Jg1AOEAVAKhEFXSn4cKUELurIAKwJ3MArypPscQaLhJFICJ0ohjDySAdH8AhDtCiTuMycH8CXzhH9jUACAO5uMhoAwA5i+T6WAKmmAqnLy80wxHqIPFYpqCwxGaYLt4Dyievg5kEoVEUAhs6pqKgFtDQYOuaXypaWKQfIuwwoGSZgfLsu/XAtI8cGN+h7Cc1A5oLOMhwlIPXuhu48AIvsSBkvtV9wsJRKCyYLfq5lTrQMFd1a262oqBck9K1V0YjQg0iEYYgpS1A9GlXQV5cykwm4A7BzVsxQqo7E+zCegO7Ma7yKgsuOcfKbMBwLC8wvVNYDsANYalEpOAa6zpWjTeMKGwEwC1CiQewJc5EKfgy7GmRAZA4vUVGwE2dPM/g0xuAInE/yG5aZ8ISxWGfYigUVbdyBElTHh2uCwGdfCkOLGgQVBh3Ewp+/QK4CDlR5Ws/Zf7yhCf8pH7vinWAvoVCQ6zz0NX5V/6GkAVV+2/5qsJ/gU8bsxpM8IeAQAAAABJRU5ErkJggg==');
          },
        },
      });
    return (
      a.add('', {
        vertex:
          'attribute vec3 aPosition;uniform mat4 uProjectionMatrix;uniform mat4 uModelMatrix;uniform mat4 uViewMatrix;void main(){gl_Position=uProjectionMatrix*uModelMatrix*uViewMatrix*vec4(aPosition,1.);}',
        fragment:
          'precision highp float;uniform vec2 t,x;uniform vec3 R,S,y;uniform vec4 z[64];uniform float A,B,l,C,D,E,F,G,H,I;uniform sampler2D J;float K=1./l;mat3 L(float a,float b){float c=cos(a),d=cos(b),e=sin(a),f=sin(b);return mat3(d,f*e,-f*c,0.,c,e,f,d*-e,d*c);}vec3 w(vec3 c,out float v){c=c.xzy;float p=max(2.,floor(log2(2.236068*l*3.141593*(1.-c.z*c.z))*.72021));vec2 g=floor(pow(1.618034,p)/2.236068*vec2(1.,1.618034)+.5),d=fract((g+1.)*.618034)*6.283185-3.883222,e=-2.*g,f=vec2(atan(c.y,c.x),c.z-1.),q=floor(vec2(e.y*f.x-d.y*(f.y*l+1.),-e.x*f.x+d.x*(f.y*l+1.))/(d.x*e.y-e.x*d.y));float n=3.141593;vec3 r;for(float h=0.;h<4.;h+=1.){vec2 s=vec2(mod(h,2.),floor(h*.5));float j=dot(g,q+s);if(j>l)continue;float a=j,b=0.;if(a>=524288.)a-=524288.,b+=.803894;if(a>=262144.)a-=262144.,b+=.901947;if(a>=131072.)a-=131072.,b+=.950973;if(a>=65536.)a-=65536.,b+=.475487;if(a>=32768.)a-=32768.,b+=.737743;if(a>=16384.)a-=16384.,b+=.868872;if(a>=8192.)a-=8192.,b+=.934436;if(a>=4096.)a-=4096.,b+=.467218;if(a>=2048.)a-=2048.,b+=.733609;if(a>=1024.)a-=1024.,b+=.866804;if(a>=512.)a-=512.,b+=.433402;if(a>=256.)a-=256.,b+=.216701;if(a>=128.)a-=128.,b+=.108351;if(a>=64.)a-=64.,b+=.554175;if(a>=32.)a-=32.,b+=.777088;if(a>=16.)a-=16.,b+=.888544;if(a>=8.)a-=8.,b+=.944272;if(a>=4.)a-=4.,b+=.472136;if(a>=2.)a-=2.,b+=.236068;if(a>=1.)a-=1.,b+=.618034;float k=fract(b)*6.283185,i=1.-2.*j*K,m=sqrt(1.-i*i);vec3 o=vec3(cos(k)*m,sin(k)*m,i);float u=length(c-o);if(u<n)n=u,r=o;}v=n;return r.xzy;}void main(){vec2 b=(gl_FragCoord.xy/t*2.-1.)/C-x*vec2(1.,-1.)/t;b.x*=t.x/t.y;float c=dot(b,b);vec4 M=vec4(0.);float m=0.;if(c<=.64){for(int d=0;d<2;d++){vec4 e=vec4(0.);float a;vec3 u=vec3(0.,0.,1.),f=normalize(vec3(b,sqrt(.64-c)));f.z*=d>0?-1.:1.,u.z*=d>0?-1.:1.;vec3 g=f*L(B,A),h=w(g,a);float n=asin(h.y),i=acos(-h.x/cos(n));i=h.z<0.?-i:i;float N=max(texture2D(J,vec2(i*.5/3.141593,-(n/3.141593+.5))).x,I),O=smoothstep(8e-3,0.,a),j=dot(f,u),v=pow(j,F)*E,o=N*O*v,T=mix((1.-o)*pow(j,.4),o,G)+.1;e+=vec4(R*T,1.);int U=int(D);float p=0.;for(int k=0;k<64;k++){if(k>=U)break;vec4 q=z[k];vec3 r=q.xyz,P=r-g;float s=q.w;if(dot(P,P)>s*s*4.)continue;vec3 V=w(r,a);a=length(V-g),a<s?p+=smoothstep(s*.5,0.,a):0.;}p=min(1.,p*v),e.xyz=mix(e.xyz,S,p),e.xyz+=pow(1.-j,4.)*y,M+=e*(1.+(d>0?-H:H))/2.;}m=pow(dot(normalize(vec3(-b,sqrt(1.-c))),vec3(0.,0.,1.)),4.)*smoothstep(0.,1.,.2/(c-.64));}else{float Q=sqrt(.2/(c-.64));m=smoothstep(.5,1.,Q/(Q+1.));}gl_FragColor=M+vec4(m*y,m);}',
        uniforms: {
          t: { type: 'vec2', value: [E.width, E.height] },
          A: _('float', M),
          B: _('float', R),
          l: _('float', c),
          E: _('float', O),
          I: _('float', l),
          R: _('vec3', N),
          S: _('vec3', G),
          F: _('float', P),
          y: _('vec3', s),
          G: _('float', f),
          z: { type: 'vec4', value: C(E[S]) },
          D: { type: 'float', value: E[S].length },
          x: _('vec2', u, [0, 0]),
          C: _('float', m, 1),
          H: _('float', x, 1),
        },
        mode: 4,
        geometry: {
          vertices: [
            { x: -100, y: 100, z: 0 },
            { x: -100, y: -100, z: 0 },
            { x: 100, y: 100, z: 0 },
            { x: 100, y: -100, z: 0 },
            { x: -100, y: -100, z: 0 },
            { x: 100, y: 100, z: 0 },
          ],
        },
        onRender: ({ uniforms: e }) => {
          let t = {};
          if (E.onRender) {
            t = E.onRender(t) || t;
            for (let L in I) t[L] !== void 0 && (e[I[L]].value = t[L]);
            t[S] !== void 0 &&
              ((e['z'].value = C(t[S])), (e['D'].value = t[S].length)),
              t.width && t.height && (e['t'].value = [t.width, t.height]);
          }
        },
      }),
      a
    );
  };
export { p as default };
