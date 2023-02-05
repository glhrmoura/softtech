const specialBoundingBoxes = [
  {
    minLat: -46.361899,
    maxLat: -34.276938,
    minLon: -15.411580,
    maxLon: -2.196998,
  },
  {
    minLat: -52.997614,
    maxLat: -44.428305,
    minLon: -20.000000,
    maxLon: -19.766959,
  },
];

const normalBoundingBoxes = [
    {
    minLat: -54.777426,
    maxLat: -46.603598,
    minLon: -34.016466,
    maxLon: -26.155681,
  },
];

const isBetween = (val, min, max) => {
  return min <= val && val <= max;
};

const inBox = (coord, boxs) => {
  const { latitude, longitude } = coord;

  return boxs.some((box) => (
    isBetween(latitude, box.minLat, box.maxLat) &&
    isBetween(longitude, box.minLon, box.maxLon)
  ));
};

export const getType = (user) => {
  const { coordinates: coord } = user.location;

  if (inBox(coord, specialBoundingBoxes)) return 'special';
  else if (inBox(coord, normalBoundingBoxes)) return 'normal';
  return 'hard-work';
};

export const withType = (users) => {
  return users.map((user) => ({
    ...user,
    type: getType(user),
  }));
};

export const byTypes = (types = []) => {
  if (!types.length) return () => true;

  return (user) => {
    return types.includes(user.type);
  };
};

export const byAge = (age = 0) => {
  if (!age) return () => true;

  return (user) => {
    return user.dob.age <= age;
  };
};

export const byGender = (genders = []) => {
  if (!genders.length) return () => true;

  return (user) => {
    return genders.includes(user.gender);
  };
};

export const byName = (name = '') => {
  if (!name) return () => true;

  return (user) => {
    const reg = new RegExp(name, 'i');
    const { first, last } = user.name;

    return reg.test(`${first} ${last}`);
  };
};
