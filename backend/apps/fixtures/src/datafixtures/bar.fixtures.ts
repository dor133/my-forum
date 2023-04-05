import { Fixtures } from '@dauflo/nest-fixtures'

export class BarFixtures extends Fixtures {
    constructor(/* @InjectModel(Bar.name) private model: Model<BarDocument>, private reference: ReferenceRepository */) {
        super()
    }

    async load(): Promise<void> {
        // const foo = this.reference.getReference<Foo[]>('foo')
        // const documents = await this.model.insertMany([{ name: 'bar1', ref: foo }, { name: 'Bar2', ref: foo }])
        // this.reference.addReference('bar', documents)
    }
}
