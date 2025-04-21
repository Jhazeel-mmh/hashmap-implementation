import { LinkedList } from "./linkedList";

class HashMap {
    constructor(){
        this.loadFactor = 0.8;
        this.capacity = 16;
        this.array = [];
        this.count = 0;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
    } 
     
    set(key, value){
        let index = Math.abs(this.hash(key)) % this.capacity;
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds");
        }
          
        if (!this.array[index]){
            const bucket = new LinkedList();
            bucket.append([key, value]);
            this.array[index] = bucket;
            this.count++;
        } else {
            const bucket = this.array[index];
            let tmpNode = bucket.head();
            while (tmpNode){
                if (tmpNode.data[0] === key){
                    tmpNode.data[1] = value;
                    return;
                }
                tmpNode = tmpNode.next;
            }
            this.array[index].append([key, value]);
            this.count++;
            return;
        }
        
        
        if (this.count > (this.loadFactor * this.capacity)){
            this.capacity *= 2;
            this.count = 0;
            const tmpArray = this.array;
            this.array = [];

            for (let bucket of tmpArray){
                if (!bucket || !bucket.head()) continue;
                let tmpNode = bucket.head()
                while (tmpNode){
                    this.set(tmpNode.data[0], tmpNode.data[1]);
                    tmpNode = tmpNode.next;
                }
            }
        }
    } 

    get(key){
        const index = Math.abs(this.hash(key) % this.capacity); 
        const tmpNode = this.array[index];

        if (!tmpNode || !tmpNode.head()) return null;

        let tmpBucket = tmpNode.head();

        while (tmpBucket){
            if (tmpBucket.data[0] === key){
                return tmpBucket.data[1]
            }

            tmpBucket = tmpBucket.next;
        }
        return null;
    }   

    has(key){
        return this.get(key) !== null;
        /*
        const index = Math.abs(this.hash(key) % this.capacity); 
        const tmpNode = this.array[index];

        if (!tmpNode || !tmpNode.head()) return false;

        let tmpBucket = tmpNode.head();
        while (tmpBucket){
            if (tmpBucket.data[0] === key){
                return true;
            }

            tmpBucket = tmpBucket.next;
        }
        return false;
        */
    }

    remove(key){
        const index = Math.abs(this.hash(key) % this.capacity); 
        let bucket = this.array[index];
        
        if (!bucket || !bucket.head()) return false;

        let curentBucket = tmpNode.head();
        let prevBucket;
        while(curentBucket){
            if (curentBucket.data[0] === key){
                if (!prevBucket){
                    bucket = curentBucket.next;
                } else {
                    curentBucket = curentBucket.next;
                    prevBucket.next = curentBucket;
                    this.array[index] = prevBucket;
                }

                this.count--;
                return true
            }

            prevBucket = curentBucket;
            curentBucket = curentBucket.next;
        }
        return false;
    }

    length(){
        return this.count;
    }

    clear(){
        this.capacity = 16;
        this.array = [];
        this.count = 0;
    }

    keys(){
        const keys = []
        for (let bucket of this.array){
            let tmpBucket = bucket.head();
            if (!tmpBucket) continue;
            while(tmpBucket){
                keys.push(tmpBucket.data[0]);
                tmpBucket = tmpBucket.next;
            }
        }
        return keys;
    }
}