import 'es6-shim';
import 'reflect-metadata';
import { classToPlain, plainToClass } from '../../src/index';
import { Photo } from './Photo';

// check deserialization

let photoJson = {
  id: '1',
  filename: 'myphoto.jpg',
  description: 'about my photo',
  tags: ['me', 'iam'],
  albums: [
    {
      id: '1',
      name: 'My life',
    },
    {
      id: '2',
      name: 'My young years',
    },
  ],
};

let photo = plainToClass(Photo, photoJson);
console.log('deserialized object: ', photo);
console.log('-----------------------------');
console.log('Trying to find album: ', photo.albums.findByName('My life'));
console.log('-----------------------------');

// now check serialization

let newPhotoJson = classToPlain(photo);
console.log('serialized object: ', newPhotoJson);
console.log('-----------------------------');
