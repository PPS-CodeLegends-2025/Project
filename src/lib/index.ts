
type Arg = {
    x: number
}

interface IFetch {
    get: ({ x } : Arg) => number; 
}

class Fetcher implements IFetch {

    private fn() {
        return 5;
    }
    
    public get({ x } : Arg) {
        return this.fn() * x;
    }
}

const f = new Fetcher();

f.get({ x: 3 });
