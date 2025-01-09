import * as Fa from 'react-icons/fa';
import * as Si from 'react-icons/si';
import * as Io from 'react-icons/io';
import * as Md from 'react-icons/md';
import * as Ti from 'react-icons/ti';
import * as Gi from 'react-icons/gi';
import * as Wi from 'react-icons/wi';
import * as Fi from 'react-icons/fi';
import * as Ai from 'react-icons/ai';
import * as Bs from 'react-icons/bs';
import * as Ri from 'react-icons/ri';
import * as Fc from 'react-icons/fc';
import * as Go from 'react-icons/go';
import * as Hi from 'react-icons/hi';
import * as Bi from 'react-icons/bi';
import * as Di from 'react-icons/di';
import * as Cg from 'react-icons/cg';
import * as Vsc from 'react-icons/vsc';
import * as Im from 'react-icons/im';

const iconLibraries = {
    Fa, Si, Io, Md, Ti, Gi, Wi, Fi, Ai, Bs, Ri, Fc, Go, Hi, Bi, Di, Cg, Vsc, Im
};

export function getIcon(iconName) {
    for (const [prefix, library] of Object.entries(iconLibraries)) {
        if (iconName.startsWith(prefix)) {
            return library[iconName];
        }
    }
    return null;
}
