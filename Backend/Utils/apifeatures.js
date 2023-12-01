class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // Search() feature
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  //Filter() feature
  filter() {
    const querycopy = { ...this.queryStr };
    //Removing Some fields for catogery
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((element) => {
      delete querycopy[element];
    });

    // filter for price and Ratiing
    let queryStr = JSON.stringify(querycopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    //////////////////////////////////////////////////

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // Adding Pagination Feature
  pagination(resultperpage) {
    const currentpage = Number(this.queryStr.page) || 1;
    const skip = resultperpage * (currentpage - 1);
    this.query = this.query.limit(resultperpage).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;
